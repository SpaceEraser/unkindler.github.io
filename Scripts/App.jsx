var ClassPicker = React.createClass({
	render: function(){
		var classes = [];

		this.props.classes.forEach(function(cl,i){
			classes.push(
				<option value="{cl.id}">{cl.title}</option>
			);
		});

		return (
			<select className="characterClassPicker">
				{classes}
			</select>
		);
	}
});

var StatsSection = React.createClass({
	render: function(){
		
	}
});

var BuildStatsSection = React.createClass({
	render: function(){
		var buildStats = [];

		this.props.buildStats.forEach(function(buildStat,i){
			buildStats.push(
				<div id={buildStat.stat.id}>
					{buildStat.stat.title} - {buildStat.value}
				</div>
			);
		});

		return(
			<div className="buildStatsSection">
				{buildStats}
			</div>
		);
	}
});

var UnkindlerApp = React.createClass({
	render: function(){
		var build = this.props.build;

		return (
			<div className="unkindlerApp">
				<div className="appheader">
					<h1 className="headerTitle">Unkindler</h1>
				</div>
				<div className="appBody">
					<div class="buildSection">
						<StatsSection title="Level" stats={build.getStatsByCategory('level')} />

						<AttributesSection />
					</div>

					<div class="buildSection">
						<StatsSection title="Base Stats" stats={build.getStatsByCategory('base')} />
						<StatsSection title="Defense"    stats={build.getStatsByCategory('defense')} />
					</div>

					<div class="buildSection">
						<StatsSection title="Attack"      stats={build.getStatsByCategory('attack')} />
						<StatsSection title="Resistances" stats={build.getStatsByCategory('resistances')} />
					</div>

					<ClassPicker 
						classes={this.props.classes.getCharacterClasses()} />
				</div>
			</div>
		);
	}	
});

var characterBuild = new CharacterBuild(CharacterClasses.getCharacterClassById(0));

ReactDOM.render(
	<UnkindlerApp 
		build={characterBuild}
		classes={CharacterClasses} 
		stats={CharacterStats} />,
	document.getElementById('unkindlerHook')
);