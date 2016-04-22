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

var AttributesSection = React.createClass({
	render: function(){
		return (
			<div>This is the attributes section</div>
		);
	}
});

var UnkindlerApp = React.createClass({
	getInitialState: function(){
		return {
			characterBuild: this.props.initialCharacterBuild
		};
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
						<StatsSection title="Level" buildStats={characterBuild.getBuildStatsByCategory('level')} />

						<AttributesSection characterBuild={characterBuild} />
					</div>

					<div className="buildSection">
						<StatsSection title="Base Stats" buildStats={characterBuild.getBuildStatsByCategory('base')} />
						<StatsSection title="Defense"    buildStats={characterBuild.getBuildStatsByCategory('defense')} />
					</div>

					<div className="buildSection">
						<StatsSection title="Attack"      stats={characterBuild.getBuildStatsByCategory('attack')} />
						<StatsSection title="Resistances" stats={characterBuild.getBuildStatsByCategory('resistances')} />
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