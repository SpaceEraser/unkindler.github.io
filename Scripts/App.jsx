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
		var buildStats = this.props.buildStats.map(function(buildStat,i){
			return(
				<div key={buildStat.title}>
					{buildStat.title} - {buildStat.value}
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
			this.props.handleCharacterAttributeChange(this.props.attribute.toLowerCase(),Number(newValue));
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
			var baseAttributeLookup = baseAttribute.toLowerCase();

			attributeRows.push(
				<AttributeRow 
				key={baseAttribute} 
				attribute={baseAttribute}
				baseValue={baseAttributes[baseAttributeLookup]}
				investedValue={investedAttributes[baseAttributeLookup]}
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
		var characterBuild = this.props.initialCharacterBuild;
		return {
			characterBuild: characterBuild,
			characterStats: this.props.stats.getStatSet(characterBuild.getAttributeTotalSet())
		};
	},
	handleCharacterAttributeChange: function(attribute,newValue){
		var characterBuild = this.state.characterBuild;

		characterBuild.setCharacterAttributeInvested(attribute,newValue);

		this.setState({
			characterBuild: characterBuild,
			characterStats: this.props.stats.getStatSet(characterBuild.getAttributeTotalSet())
		});
	},
	handleCharacterClassChange: function(newClassId){
		var newCharacterClass = this.props.classes.getCharacterClassById(newClassId);
		var characterBuild = this.state.characterBuild;

		characterBuild.setCharacterClass(newCharacterClass);
		
		this.setState({
			characterBuild: characterBuild,
			characterStats: this.props.stats.getStatSet(characterBuild.getAttributeTotalSet())
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
						title="Soul Level" 
						buildStats={[
							{title: 'Soul Level', value: characterBuild.getSoulLevel()}
						]} />

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
						buildStats={[
							{title: 'Health Ponts', value: this.state.characterStats.hp},
							{title: 'Embered HP', value: Math.round(this.state.characterStats.hp*1.3)},
							{title: 'Equip Load Max', value: this.state.characterStats.equipMax},
							{title: 'Attunement Slots', value: this.state.characterStats.attunementSlots},
							{title: 'Focus Points', value: this.state.characterStats.fp},
							{title: 'Stamina', value: this.state.characterStats.stamina},
							{title: 'Casting Speed', value: this.state.characterStats.castingSpeed},
						]}/>

					</div>

					<div className="buildSection">
						<StatsSection 
						title="Defense"       
						buildStats={[
							{title: 'Physical',value: this.state.characterStats.defense_physical},
							{title: 'VS Strike',value: this.state.characterStats.defense_strike},
							{title: 'VS Slash',value: this.state.characterStats.defense_slash},
							{title: 'VS Thrust',value: this.state.characterStats.defense_thrust}
						]}/>

						<StatsSection 
						title="Elemental Defense"           
						buildStats={[
							{title: 'Magic',value: this.state.characterStats.defense_magic},
							{title: 'Fire',value: this.state.characterStats.defense_fire},
							{title: 'Lightning',value: this.state.characterStats.defense_lightning},
							{title: 'Dark',value: this.state.characterStats.defense_dark}
						]}/>

						<StatsSection 
						title="Resistance"             
						buildStats={[
							{title: 'Bleed',value: this.state.characterStats.resistance_bleed},
							{title: 'Poison',value: this.state.characterStats.resistance_poison},
							{title: 'Curse',value: this.state.characterStats.resistance_curse},
							{title: 'Frost',value: this.state.characterStats.resistance_frost}
						]}/>   
					</div>
				</div>
			</div>
		);
	}	
});

$.ajax({
    type: "GET",
    url: "Stats/StatIncreases.csv",
    dataType: "text",
    success: function(csvStr) {
    	var statsIncreases = new StatsIncreases(csvStr);

		var characterBuild = new CharacterBuild();

		ReactDOM.render(
			<UnkindlerApp 
				initialCharacterBuild={characterBuild}
				classes={CharacterClasses} 
				stats={statsIncreases}
				nameFilter={NameFilter} />,
			document.getElementById('unkindlerHook')
		);
    }
 });

