//-------------------------------------------------------------
StatSet = function(){
//stats at 10/10/10/etc...
	this.spellSlots = 1;
	this.hp = 403;
	this.defense_physical = 83;
	this.defense_strike = 83;
	this.defense_slash = 83;
	this.defense_thrust = 83;
	this.defense_magic = 83;
	this.defense_fire = 83;
	this.defense_lightning = 83;
	this.defense_dark = 83;
	this.resistance_bleed = 108;
	this.resistance_curse = 108;
	this.resistance_frost = 108;
	this.resistance_poison = 108;

	this.equipLoadMax = 50;
	this.attunementSlots = 1;
	this.fp = 93;
	this.stamina = 96;

	//TODO: Add things like item discovery, casting speed, etc.
}

StatsIncreases = function(csvStr){
	var allTextLines = csvStr.split(/\r\n|\n/);//<- crowd of sunbros

//collect headers
	var headersText = allTextLines.shift().split(',');

//break apart headers to their components
	headers = headersText.map(function(header){
		return header.split('_');
	});

//convert content lines to matrix
	var allLines = allTextLines.map(function(line){
		return line.split(',');
	});

//convert to nested object
	var statIncreases = {};

	allLines.forEach(function(line){
		var investment = line[0];

		for(var i=1;i<line.length;i++){
			var header = headers[i];
			var attributeName = header[0];
			var stat = header[header.length-1];
			var statValue = Number(line[i]);

			if(!statIncreases[attributeName]){
				statIncreases[attributeName] = {};
			}

			var attributeStats = statIncreases[attributeName][investment];

			if(!attributeStats){
				attributeStats = statIncreases[attributeName][investment] = {};
			}

			attributeStats[stat] = statValue;

			if(!statIncreases[attributeName]){
				statIncreases[attributeName] = {};
			}

			statIncreases[attributeName][investment] = attributeStats;
		}
	});

	return {
		_statIncreases: statIncreases,
		getStatSet: function(attributeSet){
			var statSet = new StatSet();

			for(var attrName in attributeSet){
				var attrValue = attributeSet[attrName];

				var statIncrease = this._statIncreases[attrName];

				if(statIncrease){
					var statIncreaseRow = statIncrease[attrValue];

					for(var stat in statSet){
						var increaseAmount = statIncreaseRow[stat];
						if(increaseAmount){
							statSet[stat] += statIncreaseRow[stat];
						}
					}
				}
			}

			return statSet;
		}
	};
}

// ------------------------------------------------------------
// 					Character base classes
// ------------------------------------------------------------

CharacterAttributeSet = function(vigor,attunement,endurance,vitality,strength,dexterity,intelligence,faith,luck){
	this.vigor			= vigor;
	this.attunement		= attunement;
	this.endurance		= endurance;
	this.vitality		= vitality;
	this.strength		= strength;
	this.dexterity		= dexterity;
	this.intelligence	= intelligence;
	this.faith			= faith;
	this.luck			= luck;
}

CharacterClass = function(id,title,baseAttributes){
	this.id = id;
	this.title = title;
	this.baseAttributes = baseAttributes;

	this.baseLevel = -89;//10 base stats * 9 attributes - 1 starting level

	for(var p in baseAttributes){
		this.baseLevel += baseAttributes[p];
	}
}

CharacterClasses = function(){
	var _classes = [];

	return {
		addCharacterClass: function(characterClass){
			characterClass.id = _classes.length;
			_classes.push(characterClass);
		},
		getCharacterClasses: function(){
			return _classes;
		},
		getCharacterClassById: function(id){
			return _classes[id];
		},
		getCharacterClassByName: function(title){
			for(var i=0;i<_classes.length;i++){
				if(_classes[i].title == title){
					return _classes[i];
				}
			}

			return false;
		}
	};
}();

CharacterClasses.addCharacterClass(new CharacterClass(0,    'Knight', new CharacterAttributeSet( 12, 10, 11, 15, 13, 12,  9,  9,  7)));
CharacterClasses.addCharacterClass(new CharacterClass(1, 'Mercenary', new CharacterAttributeSet( 11, 12, 11, 10, 10, 16, 10,  8,  9)));
CharacterClasses.addCharacterClass(new CharacterClass(2,   'Warrior', new CharacterAttributeSet( 14,  6, 12, 11, 16,  9,  8,  9, 11)));
CharacterClasses.addCharacterClass(new CharacterClass(3,    'Herald', new CharacterAttributeSet( 12, 10,  9, 12, 12, 11,  8, 13, 11)));
CharacterClasses.addCharacterClass(new CharacterClass(4,     'Thief', new CharacterAttributeSet( 10, 11, 10,  9,  9, 13, 10,  8, 14)));
CharacterClasses.addCharacterClass(new CharacterClass(5,  'Assassin', new CharacterAttributeSet( 10, 14, 11, 10, 10, 14, 11,  9, 10)));
CharacterClasses.addCharacterClass(new CharacterClass(6,  'Sorcerer', new CharacterAttributeSet(  9, 16,  9,  7,  7, 12, 16,  7, 12)));
CharacterClasses.addCharacterClass(new CharacterClass(7,'Pyromancer', new CharacterAttributeSet( 11, 12, 10,  8, 12,  9, 14, 14,  7)));
CharacterClasses.addCharacterClass(new CharacterClass(8,    'Cleric', new CharacterAttributeSet( 10, 14,  9,  7, 12,  8,  7, 16, 13)));
CharacterClasses.addCharacterClass(new CharacterClass(9,  'Deprived', new CharacterAttributeSet( 10, 10, 10, 10, 10, 10, 10, 10, 10)));

// ------------------------------------------------------------
//					The user's character build
// ------------------------------------------------------------
CharacterBuild = function(name,characterClass,attributeSet){
	this.title = name || 'Untitled';
	this.characterClass = characterClass || CharacterClasses.getCharacterClassById(0);
	this.investedAttributes = attributeSet || new CharacterAttributeSet(0,0,0,0,0,0,0,0,0);
}

CharacterBuild.prototype.getSoulLevel = function(){
	var soulLevel = this.characterClass.baseLevel;

	for(var attribute in this.investedAttributes){
		soulLevel += this.investedAttributes[attribute];
	}

	return soulLevel;
}

CharacterBuild.prototype.getAttributeTotal = function(attribute){
	return this.characterClass.baseAttributes[attribute] + this.investedAttributes[attribute];
}

CharacterBuild.prototype.getAttributeTotalSet = function(){
	var attributeTotalSet = {};

	for(var attrName in this.investedAttributes){
		attributeTotalSet[attrName] = this.characterClass.baseAttributes[attrName] + this.investedAttributes[attrName];
	}

	return attributeTotalSet;
}

CharacterBuild.prototype.setCharacterAttributeInvested = function(attribute,n){
	this.investedAttributes[attribute] = n;
}

CharacterBuild.prototype.setCharacterClass = function(characterClass){
	this.characterClass = characterClass;
}

CharacterBuild.prototype.setCharacterName = function(nameStr){
	this.title = nameStr;
}

CharacterBuild.prototype.getCharacterName = function(){
	return this.title;
}

//---------------------------------------------------
//				Name Filter
//---------------------------------------------------

NameFilter = function(){
	var _censoredTerms = ["69","666","1cup","2girls","2girls1cup","4r5e","5h1t","abortion","ahole","aids","anal","anal sex","analsex","angrydragon","angrydragons","angrypenguin","angrypenguins","angrypirate","angrypirates","anus","apeshit","ar5e","arrse","arse","arsehole","artard","askhole","ass","ass 2 ass","ass hole","ass kisser","ass licker","ass lover","ass man","ass master","ass pirate","ass rapage","ass rape","ass raper","ass to ass","ass wipe","assbag","assbandit","assbanger","assberger","assburger","assclown","asscock","asses","assface","assfuck","assfucker","assfukker","asshat","asshead","asshole","asshopper","assjacker","asslicker","assmunch","asswhole","asswipe","aunt flo","b000bs","b00bs","b17ch","b1tch","bag","ballbag","ballsack","bampot","bang","bastard","basterd","bastich","bean count","beaner","beastial","beastiality","beat it","beat off","beaver","beavers","beeyotch","betch","beyotch","bfe","bi sexual","bi sexuals","biatch","bigmuffpi","biotch","bisexual","bisexuality","bisexuals","bitch","bitched","bitches","bitchin","bitching","bizatch","blackie","blackies","block","bloody hell","blow","blow job","blow wad","blowjob","boff","boffing","boffs","boink","boinking","boinks","boiolas","bollick","bollock","bondage","boner","boners","bong","boob","boobies","boobs","booty","boy2boy","boy4boy","boyforboy","boyonboy","boys2boys","boys4boys","boysforboys","boysonboys","boytoboy","brothel","brothels","brotherfucker","buceta","bugger","bugger ","buggered","buggery","bukake","bullshit","bumblefuck","bumfuck","bung","bunghole","bush","bushpig","but","but plug","butplug","butsecks","butsekks","butseks","butsex","butt","buttfuck","buttfucka","buttfucker","butthole","buttmuch","buttmunch","buttplug","buttsecks","buttsekks","buttseks","buttsex","buttweed","c0ck","c0cksucker","cabron","camel toe","camel toes","cameltoe","canabis","cannabis","carpet muncher","castrate","castrates","castration","cawk","chank","cheesedick","chick2chick","chick4chick","chickforchick","chickonchick","chicks2chicks","chicks4chicks","chicksforchicks","chicksonchicks","chickstochicks","chicktochick","chinc","chink","chinks","choad","choads","chode","cipa","circlejerk","circlejerks","cl1t","cleavelandsteemer","cleveland","clevelandsteamer","clevelandsteemer","clit","clitoris","clitoris     ","clits","clusterfuck","cock","cock block","cock suck","cockblock","cockface","cockfucker","cockfucklutated","cockhead","cockmaster","cockmunch","cockmuncher","cockpenis","cockring","cocks","cocksuck","cocksucker","cocksuka","cocksukka","cok","cokmuncher","coksucka","comestain","condom","condoms","coochie","coon","coons","cooter","copulated","copulates","copulating","copulation","corn","corn_hole","cornhole","cornholes","cr4p","crap","crapping","craps","cream","creampie","crotch","crotches","cum","cumming","cums","cumshot","cumstain","cumtart","cunnilingus","cunt","cuntbag","cunthole","cuntilingis","cuntilingus","cunts","cuntulingis","cuntulingus","d1ck","dabitch","dago","dammit","damn","damned","dance","darkie","darkies","darky","deep","deepthroat","defecate","defecates","defecating","defecation","deggo","diaf","diarea","diarhea","diarrhea","dick","dickhead","dickhole","dickring","dicks","dicksucker","dicksuckers","dicksucking","dicksucks","dickwad","dickweed","dickwod","dik","dike","dikes","dildo","dildoe","dildoes","dildos","dilligaf","dingleberry","dipshit","dirsa","dlck","dog","doggin","doggystyle","dogshit","domination","dominatrix","donkey","donkeyribber","dook","doosh","dork","dorks","douche","douchebag","douchebags","douchejob","douchejobs","douches","douchewaffle","duche","dumass","dumb","dumb fuck","dumbass","dumbfuc","dumbfuck","dumbshit","dumdfuk","dumfuck","dumshit","dyke","dykes","ead","eat me","ejaculat","ejaculate","ejaculated","ejaculates","ejaculation","ejakulat","ejakulate","enema","enemas","enima","enimas","epeen","epenis","erect","erection","erekshun","erotic","eroticism","f0x0r","f0xx0r","fack","facker","facking","fag","fagbag","faggit","faggitt","faggot","faggots","faghag","fags","fagtard","fannyflaps","fannyfucker","fart","farting","farts","fatass","fck","fcker","fckers","fcking","fcks","fcuk","fcuker","fcuking","feck","fecker","felch","felched","felcher","felches","felching","fellate","fellatio","feltch","feltched","feltcher","feltches","feltching","fetish","fetishes","finger","fingering","fisting","flog","flogging","flogs","fook","fooker","foreskin","forked","fornicate","fornicates","fornicating","fornication","frigging","frottage","fubar","fuck","fucka","fuckas","fuckass","fucked","fuckedup","fucker","fuckers","fuckface","fuckfaces","fuckhead","fuckhole","fuckhouse","fuckin","fucking","fuckingshitmotherfucker","fucknugget","fucks","fucktard","fuckwad","fuckwhit","fuckwit","fuckyou","fucndork","fudgepacker","fudgepacking","fugly","fuk","fuken","fuker","fukker","fukkin","fukwhit","fukwit","fuq","fuqed","fuqing","fuqs","fux","fux0r","fuxx0r","gang bang","gangbang","gangbanger","gangbangers","gangbanging","gangbangs","ganja","gay","gaydar","gays","gaytard","gaywad","genital","genitalia","genitals","gerbiling","ghey","girl2girl","girl4girl","girlforgirl","girlongirl","girls2girls","girls4girls","girlsforgirls","girlsongirls","girlstogirls","girltogirl","gloryhole","goatse","gobshit","gobshite","gobtheknob","goddam","goddammit","goddamn","goddamned","goddamnit","gooch","gook","gooks","groe","gspot","gtfo","gubb","gummer","guppy","guy2guy","guy4guy","guyforguy","guyonguy","guys2guys","guys4guys","guysforguys","guysonguys","guystoguys","guytoguy","gyfs","hair pie","hairpie","hairpies","hairy bush","hand","handjob","harbl","hard on","hardon","hardons","hell","hentai","heroin","herpes","herps","hick","hiv","ho","hoare","hoe","hoebag","hoer","hoes","hole","homo","homos","homosexual","homosexuality","homosexuals","honkee","honkey","honkie","honkies","honky","hoochie","hooker","hookers","hore","horney","hornie","horny","horseshit","hosebeast","hot","hotcarl","hotkarl","hummer","hump","humping","humps","hymen","i like ass","i love ass","i love tit","i love tits","iluvsnatch","incest","ip freely","itard","jack","jack off","jackass","jackingoff","jackoff","jap","japs","jerk off","jerkoff","jesusfreak","jewbag","jewboy","jiga","jigaboo","jigga","jiggaboo","jis","jism","jiz","jizm","jizz","job","junglebunny","jysm","kawk","khunt","kike","kikes","kinky","kkk","klit","knob","knobjocky","knobjokey","knockers","kooch","koolie","koolielicker","koolies","kootch","kukluxklan","kunt","kyke","l3itch","labia","lap","lapdance","lelo","lemonparty","lesbian","lesbians","lesbifriends","lesbo","lesbos","leyed","lez","lezzie","lichercunt","lick ass","lick myass","lick tit","lickbeaver","lickcarpet","lickdick","lickherass","lickherpie","lickmy ass","lickpussy","like ass","like tit","limpdick","lingerie","llello","lleyed","loltard","love ass","love juice","love tit","lovehole","lsd","lucifer","lumpkin","m0f0","m0fo","m45terbate","ma5terb8","ma5terbate","mack","mammaries","man2man","man4man","mandingo","manforman","mangina","manonman","mantoman","marijuana","masochism","masochist","master","masterb8","masterbat3","masterbate","masterbates","masterbating","masterbation","masterbations","masturbate","masturbates","masturbating","masturbation","meatcurtain","men2men","men4men","menformen","menonmen","mentomen","milf","minge","mistress","mof0","mofo","motha","motherfuck","motherfucka","motherfuckas","motherfucked","motherfucker","motherfuckers","motherfucking","motherfuckka","muff","muff diver","muffdiver","muffdiving","munch","mung","mutha","muther","muzza","my ass","n1gga","n1gger","naked","nambla","nards","nazi","nazies","nazis","necrophile","necrophiles","necrophilia","necrophiliac","negro","neonazi","nice ass","nig","nigg3r","nigg4h","nigga","niggah","niggas","niggaz","nigger","niggers","nigglet","niglet","nippies","nipple","nips","nobhead","nobjockey","nobjocky","nobjokey","nookey","nookie","noshit","nude","nudes","nudity","numbnuts","nut bag","nut lick","nut lover","nut sack","nut suck","nutnyamouth","nutnyomouth","nuts","nutsack","nutstains","nymph","nympho","nymphomania","nymphomaniac","nymphomaniacs","nymphos","oral","orgasm","orgasmic","orgasms","orgi","orgiastic","orgies","orgy","paedophile","panooch","panties","panty","patootie","pecker","peckerhead","peckers","pedophile","pedophiles","pedophilia","peepshow","peepshows","pen15","penii","penis","penises","penisfucker","perve","perversion","pervert","perverted","perverts","phat","phile","philes","philia","phuck","phucker","phuckers","phucking","phucks","phuk","phuker","phukers","phuking","phuks","phuq","phuqer","phuqers","phuqing","phuqs","pie","pigfucker","pimpis","piss","pissant","pissed","pisser","pisses","pissfart","pissflaps","pissing","pocket","poke","poon","poon eater","poon tang","poonani","poonanny","poonany","poonj","poonjab","poonjabie","poonjaby","poontang","poop","poopchute","poot","porchmonkey","porking","porks","porn","porno","prick","pricks","prostitot","pube","pubes","pubic","pud","pudd","puds","punani","punanni","punanny","punta","puntang","pusse","pussi","pussies","pussy","puta","puto","qeef","qfmft","qq more","quafe","quap","quatch","queef","queefe","queefed","queefing","queer","queerbait","queermo","queers","queev","quefe","queif","quief","quif","quiff","quim","quim nuts","qweef","racial","racism","racist","racists","rape","raped","raper","raping","rapist","redtide","reefer","renob","retard","ricockulous","rim job","rimjaw","rimjob","rimjobs","rimming","roofie","rtard","rtfm","rubbers","rump","rumpranger","rumprider","rumps","rustytrombone","sadism","sadist","sadomasochism","sand nigger","sandnigga","sandniggas","sandnigger","sandniggers","sapphic","sappho","sapphos","satan","scatological","scheiss","scheisse","schlong","schlonging","schlongs","schtup","schtupp","schtupping","schtups","screw","screw me","screw this","screw you","screwed","screwer","screwing","screws","screwyou","scroat","scrog","scrote","scrotum","secks","sekks","seks","semen","sex","sexed","sexking","sexkitten","sexmachine","sexqueen","sexual","sexuality","sexy","sexybitch","sexybitches","sh1t","shag","shagger","shaggin","shagging","shart","shemale","shit","shitdick","shite","shited","shitey","shitface","shitfaced","shitfuck","shithead","shitlist","shits","shitt","shitted","shitter","shittiest","shitting","shitts","shitty","shiznits","shotacon","shotakon","shyte","sickass","sixtynine","sixtynining","skank","skeet","sketell","sko","skrew","skrewing","skrews","slant eye","slanteyes","slattern","slave","slaves","slopehead","slopeheads","slut","slutbag","slutpuppy","sluts","slutty","slutwhore","smegma","smut","snatch","snatches","soddom","sodom","sodomist","sodomists","sodomize","sodomized","sodomizing","sodomy","sonnofabitch","sonnovabitch","sonnuvabitch","sonofabitch","spank","spanked","spanking","spanks","spearchucker","spearchuckers","sperm","spermicidal","spermjuice","sphincter","spic","spick","spicks","spics","spik","spiks","spooge","stank ho","stankpuss","steamer","stfu","stiffie","stiffy","stud","studs","submissive","submissives","suck","suck ass","sucks ass","swinger","swingers","t1tt1e5","t1tties","take a dump","takeadump","tar baby","tarbaby","tard","teabaggin","teabagging","teen2teen","teen4teen","teenforteen","teenonteen","teens2teens","teens4teens","teensforteens","teensonteens","teenstoteens","teentoteen","teets","teez","testes","testical","testicals","testicle","testicles","threesome","throat","thundercunt","tiddie","tiddy","tit","titandass","titbabe","titball","titfuck","tits","titsandass","titt","tittie","tittie5","tittiefucker","titties","titts","titty","tittyfuck","tittywank","titwank","toke","toss salad","tramp","tramps","tranny","transexual","transexuals","transvestite","transvestites","tubgirl","turd","tw4t","twat","twathead","twatlips","twats","twatty","twunt","twunter","ufia","umfriend","underwear","up yours","upyours","upyourz","urinate","urinated","urinates","urinating","urination","urine","vaffanculo","vag","vagina","vaginal","vaginas","vaginer","vagitarian","vagoo","vagy","vajayjay","viagra","vibrator","virgin","virginity","virgins","voyeur","voyeurism","voyeurs","vulva","w00se","wackedoff","wackoff","wad blower","wad lover","wad sucker","wadblower","wadlover","wadsucker","waffle","wang","wank","wanker","wanky","wetback","wetbacks","wetdream","wetdreams","whackedoff","whackoff","whigger","whip","whipped","whipping","whips","whiz","whoe","whore","whored","whorehouse","whores","whoring","wigger","willies","wog","wogged","woggy","wogs","woman2woman","woman4woman","womanforwoman","womanonwoman","womantowoman","women2women","women4women","womenforwomen","womenonwomen","womentowomen","woof","wop","xx","xxx","yank","yayo","yeat","yeet","yeyo","yiff","yiffy","yola","yols","yoni","youaregay","yourgay","zipperhead","zipperheads","zorch"];
	
	var _censorRegex = new RegExp(_censoredTerms.join('|'),'ig');

	return {
		getFilteredName: function(str){
			return str.replace(_censorRegex,function(str){
				return Array(str.length+1).join('*');
			});
		}
	};
}();

//      digit 1 = version
// digit      2 = class id
// digits  3-21 = stats
// digit     22 = divider
// digits    23+ = character name

//?b=0210101010101010101010|Fish%20Stick
//Translates to:
//Version 0
//Class id #2
// stats all 10
// character name Fish Stick

var BuildSerializer = function(){
	var _versionImporter = {
		'0': function(buildString){
			var characterClassId = buildString.substr(1,1);

			var characterClass = CharacterClasses.getCharacterClassById(characterClassId);

			var attributeSet = new CharacterAttributeSet(
				Number(buildString.substr(2,2)),
				Number(buildString.substr(4,2)),
				Number(buildString.substr(6,2)),
				Number(buildString.substr(8,2)),
				Number(buildString.substr(10,2)),
				Number(buildString.substr(12,2)),
				Number(buildString.substr(14,2)),
				Number(buildString.substr(16,2)),
				Number(buildString.substr(18,2))
			);

			var characterName = buildString.substr(buildString.indexOf('|')+1);

			var characterBuild = new CharacterBuild(characterName,characterClass,attributeSet);

			return characterBuild;
		}
	};

	return {
		export: function(characterBuild){

		},
		import: function(buildString){
			var version = buildString.substr(0,1);

			return _versionImporter[version]();
		}
	};
}();