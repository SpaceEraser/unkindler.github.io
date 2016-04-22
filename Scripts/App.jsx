var ClassChooser = React.createClass({
	render: function(){
		var classes = [];

		$.each(this.props.classes,function(title,cl){
			classes.push(
				<option value="{cl.title}">{cl.title}</option>
			);
		});

		return (
			<select>
				{classes}
			</select>
		);
	}
});

ReactDOM.render(
	<ClassChooser classes={CharacterClasses.classes} />,
	document.getElementById('unkindler')
);