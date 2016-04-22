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
				<div class="buildStatsSectionHeader">{this.props.title}</div>
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
				<span className="attributeBaseValue">{this.props.baseValue}</span>
				
				<span>
					<input 
					type="number"
					ref="attributeInput"
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
	render: function(){
		var characterBuild = this.state.characterBuild;

		return (
			<div className="unkindlerApp">
				<div className="appheader">
					<h1 className="headerTitle"></h1>
				</div>
				<div className="appBody">
					<div className="buildSection">
						<StatsSection 
						title="Level" 
						buildStats={characterBuild.getBuildStatsByCategory('level')} />

						<AttributesSection 
						characterBuild={characterBuild}
						handleCharacterAttributeChange={this.handleCharacterAttributeChange} />
					</div>

					<div className="buildSection">
						<StatsSection 
						title="Base Stats" 
						buildStats={characterBuild.getBuildStatsByCategory('base')} />

						<StatsSection 
						title="Defense"    
						buildStats={characterBuild.getBuildStatsByCategory('defense')} />
					</div>

					<div className="buildSection">
						<StatsSection 
						title="Attack"      
						stats={characterBuild.getBuildStatsByCategory('attack')} />
						<StatsSection 
						title="Resistances" 
						stats={characterBuild.getBuildStatsByCategory('resistances')} />
					</div>

					<ClassPicker 
						classes={this.props.classes.getCharacterClasses()}
						characterClass={characterBuild.characterClass}
						handleCharacterClassChange={this.handleCharacterClassChange} />
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
		stats={CharacterStats} />,
	document.getElementById('unkindlerHook')
);