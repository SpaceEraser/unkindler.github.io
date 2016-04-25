var ClassPicker = React.createClass({
	handleCharacterClassChange: function(event){
         this.props.handleCharacterClassChange(event.target.value);// character class id
	},
	render: function(){
		var classes = [];

		this.props.classes.forEach(function(cl,i){
			classes.push(
				<option key={cl.id} value={cl.id}>{cl.title}</option>
			);
		});

		return (
			<select 
			className="characterClassPicker" 
			onChange={this.handleCharacterClassChange} 
			value={this.props.characterClass.id}>
				{classes}
			</select>
		);
	}
});

var BuildNamer = React.createClass({
	getInitialState: function(){
		return {value: this.props.defaultName};
	},
	handleNameChange: function(e){
		var newName = e.target.value;

		this.props.handleNameChange(newName);

		this.setState({value: newName});
	},
	render: function(){
		return (
			<div className="BuilderNamer">
					<div className="builderNamerTitle">Character Name</div>
					<div className="nameInput">
						<input
						type="text"
						max="16"
						onChange={this.handleNameChange}
						value={this.state.value} />
					</div>
					<div className="builderNamerTitle">Other players will see:</div>
					<div className="filteredName">{this.props.getFilteredName(this.state.value)}</div>
			</div>
		);
	}
});

var StatsSection = React.createClass({
	render: function(){
		var buildStats = [];

		if(this.props.buildStats){
			this.props.buildStats.forEach(function(buildStat,i){
				buildStats.push(
					<div key={buildStat.stat.id}>
						{buildStat.stat.title} - {buildStat.value}
					</div>
				);
			});
		}

		return(
			<div className="buildStatsSection">
				<div className="buildStatsSectionHeader">{this.props.title}</div>
				{buildStats}
			</div>
		);
	}
});

var AttributeRow = React.createClass({
	getInitialState: function(){
		return {value: this.props.investedValue};
	},
	handleChange: function(e){
		var newValue = Number(e.target.value);

		if(newValue < 0){
			newValue = 0;
		}
		else if(newValue + this.props.baseValue > 99){
			newValue = 99 - this.props.baseValue;
		}

		//only bubble if the value has changed
		if(newValue != this.state.value){
			this.props.handleCharacterAttributeChange(this.props.attribute,Number(newValue));
		}

		this.setState({value: newValue});
	},
	render: function(){
		return (
			<div className="attributeRow">
				<span className="attributeTitle" >{this.props.attribute}</span>

				<span className="attributeBaseValue">{this.props.baseValue}</span>
				
				<span>
					<input 
					type="number"
					onChange={this.handleChange}
					value={this.state.value} />
				</span>

				<span className="attributeTotalValue">{this.props.baseValue + Number(this.state.value)}</span>
			</div>
		);
	}
});

var AttributesSection = React.createClass({
	render: function(){
		var attributes = [];

		var baseAttributes = this.props.characterBuild.characterClass.baseAttributes.getInOrder();
		var investedAttributes = this.props.characterBuild.investedAttributes.getInOrder();

		for(var i=0;i<baseAttributes.length;i++){
			var baseAttribute = baseAttributes[i];
			var investedAttribute = investedAttributes[i];

			attributes.push(
				<AttributeRow 
				key={baseAttribute.title} 
				attribute={baseAttribute.title}
				baseValue={baseAttribute.value} 
				investedValue={investedAttribute.value}
				handleCharacterAttributeChange={this.props.handleCharacterAttributeChange} />			
			);
		}

		return (
			<div className="attributesSection">
				<div className="attributesSectionHeader">Attributes</div>
				{attributes}
			</div>
		);
	}
});

var UnkindlerApp = React.createClass({
	getInitialState: function(){
		return {
			characterBuild: this.props.initialCharacterBuild
		};
	},
	handleCharacterAttributeChange: function(attribute,newValue){
		this.state.characterBuild.setCharacterAttributeInvested(attribute,newValue);

		this.setState({
			characterBuild: this.state.characterBuild
		});
	},
	handleCharacterClassChange: function(newClassId){
		var newCharacterClass = this.props.classes.getCharacterClassById(newClassId);
		
		this.state.characterBuild.setCharacterClass(newCharacterClass);
		
		this.setState({
			characterBuild: this.state.characterBuild
		});
	},
	handleNameChange: function(newName){		
		this.state.characterBuild.setCharacterName(newName);
		
		this.setState({
			characterBuild: this.state.characterBuild
		});
	},
	render: function(){
		var characterBuild = this.state.characterBuild;

		return (
			<div className="unkindlerApp">
				<div className="appheader">
					<h1 className="headerTitle"></h1>
				</div>
				<div className="appBody">

					<div className="buildSection">
						<BuildNamer 
						defaultName={characterBuild.getCharacterName()}
						getFilteredName={this.props.nameFilter.getFilteredName}
						handleNameChange={this.handleNameChange} />

						<StatsSection 
						title="Level" 
						buildStats={characterBuild.getBuildStatsByCategory('level')} />

						<ClassPicker 
							classes={this.props.classes.getCharacterClasses()}
							characterClass={characterBuild.characterClass}
							handleCharacterClassChange={this.handleCharacterClassChange} />

						<AttributesSection 
						characterBuild={characterBuild}
						handleCharacterAttributeChange={this.handleCharacterAttributeChange} />
					
					</div>

					<div className="buildSection">
						<StatsSection 
						title="Base Stats" 
						buildStats={characterBuild.getBuildStatsByCategory('base')} />

						<StatsSection 
						title="Attack"      
						buildStats={characterBuild.getBuildStatsByCategory('attack')} />
					</div>

					<div className="buildSection">
						<StatsSection 
						title="Defense"    
						buildStats={characterBuild.getBuildStatsByCategory('defense')} />

						<StatsSection 
						title="Resistances" 
						buildStats={characterBuild.getBuildStatsByCategory('resistances')} />
					</div>
				</div>
			</div>
		);
	}	
});

var characterBuild = new CharacterBuild(CharacterClasses.getCharacterClassByName('Knight'));

ReactDOM.render(
	<UnkindlerApp 
		initialCharacterBuild={characterBuild}
		classes={CharacterClasses} 
		stats={CharacterStats}
		nameFilter={NameFilter} />,
	document.getElementById('unkindlerHook')
);