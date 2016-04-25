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

		this.props.buildStats.forEach(function(buildStat,i){
			buildStats.push(
				<div key={buildStat.stat.internalName}>
					{buildStat.stat.title} - {buildStat.value}
				</div>
			);
		});

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
		var newValue = Number(e.target.value) - this.props.baseValue;

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
					value={this.props.baseValue + Number(this.state.value)} />
				</span>
			</div>
		);
	}
});

var AttributesSection = React.createClass({
	render: function(){
		var attributeRows = [];

		var attributes = ['Vigor','Attunement','Endurance','Vitality','Strength','Dexterity','Intelligence','Faith','Luck'];

		var baseAttributes = this.props.characterBuild.characterClass.baseAttributes;
		var investedAttributes = this.props.characterBuild.investedAttributes;

		for(var i=0;i<attributes.length;i++){
			var baseAttribute = attributes[i];

			attributeRows.push(
				<AttributeRow 
				key={baseAttribute} 
				attribute={baseAttribute}
				baseValue={baseAttributes[baseAttribute]}
				investedValue={investedAttributes[baseAttribute]}
				handleCharacterAttributeChange={this.props.handleCharacterAttributeChange} />			
			);
		}

		return (
			<div className="attributesSection">
				<div className="attributesSectionHeader">Attributes</div>
				{attributeRows}
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
	getBuildStats:function(statInternalNamesArr){
			var stats = this.props.stats;
			var characterBuild = this.state.characterBuild;
			var buildStats = [];

			statInternalNamesArr.forEach(function(statInternalName,i){
				var stat = stats.getStat(statInternalName);

				buildStats.push({
					stat: stat,
					value: stat.getValueFor(characterBuild)
				});
			});

			return buildStats;
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
						title="Soul Level" 
						buildStats={this.getBuildStats(['soulLevel'])} />

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
						buildStats={this.getBuildStats(['healthPoints','emberedHealthPoints','equipMax','attunementSlots','focusPoints','stamina','castingSpeed'])} />
					</div>

					<div className="buildSection">
						<StatsSection 
						title="Defense"       
						buildStats={this.getBuildStats(['physicalDefense','physicalDefenseStrike','physicalDefenseSlash','physicalDefenseThrust'])} />

						<StatsSection 
						title="Eemental Defense"     
						buildStats={this.getBuildStats(['magicDefense','fireDefense','lightningDefense','darkDefense'])}/>

						<StatsSection 
						title="Resistance"     
						buildStats={this.getBuildStats(['bleedResistance','poisonResistance','curseResistance'])}/>
					</div>
				</div>
			</div>
		);
	}	
});

var characterBuild = new CharacterBuild();

ReactDOM.render(
	<UnkindlerApp 
		initialCharacterBuild={characterBuild}
		classes={CharacterClasses} 
		stats={CharacterStats}
		nameFilter={NameFilter} />,
	document.getElementById('unkindlerHook')
);