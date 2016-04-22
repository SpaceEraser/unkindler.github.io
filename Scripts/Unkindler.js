// ------------------------------------------------------------
// 					Character stat management
//				Note: 
//						attributes = (set) a thing the player can change (STR,DEX,ATN,etc... Maybe also current Equip Load and weapons later)
//						stats = (calculated) a thing about the character affected by attributes (HP, FP, etc.)
//											
// ------------------------------------------------------------

CharacterStat = function(title,category,description,valueCalcFunc){
	this.id = -1;
	this.title = title;
	this.category = category;
	this.description = description;
	this.valueCalcFunc = valueCalcFunc;
}

CharacterStat.prototype.getValueFor = function(character){
	return this.valueCalcFunc(character);
}

CharacterStat.prototype.getInternalName = function(){
	return this.title.split(' ').join('_');
}

CharacterStats = function(){
	var _stats = [];

	return {
		addStat: function(characterStat){
			characterStat.id = _stats.length;
			_stats.push(characterStat);
		},
		getStatsByCategory: function(category){
			var categoryStats = [];

			_stats.forEach(function(stat,i){
				if(stat.category == category){
					categoryStats.push(stat);
				}
			});

			return categoryStats;
		}	
	};
}();

CharacterStats.addStat(new CharacterStat(
	'Health Points',
	'base',
	'The amount of health your character has.',
	function(character){
		switch(character.getCharacterAttributeTotal('Vigor')){
			default: return 403; //10
			case 11: return 427;
			case 12: return 454;
			case 13: return 483;
			case 14: return 515;
			case 15: return 550;
			case 16: return 594;
			case 17: return 638;
			case 18: return 681;
			case 19: return 723;
			case 20: return 764;
			case 21: return 804;
			case 22: return 842;
			case 23: return 879;
			case 24: return 914;
			case 25: return 947;
			case 26: return 977;
			case 27: return 1000;
			case 28: return 1019;
			case 29: return 1038;
			case 30: return 1056;
			case 31: return 1074;
			case 32: return 1092;
			case 33: return 1109;
			case 34: return 1125;
			case 35: return 1141;
			case 36: return 1157;
			case 37: return 1172;
			case 38: return 1186;
			case 39: return 1200;
			case 40: return 1213;
			case 41: return 1226;
			case 42: return 1238;
			case 43: return 1249;
			case 44: return 1260;
			case 45: return 1269;
			case 46: return 1278;
			case 47: return 1285;
			case 48: return 1292;
			case 49: return 1297;
			case 50: return 1300;
			case 51: return 1302;
			case 52: return 1304;
			case 53: return 1307;
			case 54: return 1309;
			case 55: return 1312;
			case 56: return 1314;
			case 57: return 1316;
			case 58: return 1319;
			case 59: return 1321;
			case 60: return 1323;
			case 61: return 1326;
			case 62: return 1328;
			case 63: return 1330;
			case 64: return 1333;
			case 65: return 1335;
			case 66: return 1337;
			case 67: return 1340;
			case 68: return 1342;
			case 69: return 1344;
			case 70: return 1346;
			case 71: return 1348;
			case 72: return 1351;
			case 73: return 1353;
			case 74: return 1355;
			case 75: return 1357;
			case 76: return 1359;
			case 77: return 1361;
			case 78: return 1363;
			case 79: return 1365;
			case 80: return 1367;
			case 81: return 1369;
			case 82: return 1371;
			case 83: return 1373;
			case 84: return 1375;
			case 85: return 1377;
			case 86: return 1379;
			case 87: return 1381;
			case 88: return 1383;
			case 89: return 1385;
			case 90: return 1386;
			case 91: return 1388;
			case 92: return 1390;
			case 93: return 1391;
			case 94: return 1393;
			case 95: return 1395;
			case 96: return 1396;
			case 97: return 1397;
			case 98: return 1399;
			case 99: return 1400;
		}
	}
));

CharacterStats.addStat(new CharacterStat(
	'Equip Load Max',
	'base',
	'What penalties your character has depending on your equip load %.',
	function(character){
		return character.getCharacterAttributeTotal('Vitality') + 40;
	}
));

CharacterStats.addStat(new CharacterStat(
	'Attunement Slots',
	'base',
	'How many spell slots you can attune at bonfires',
	function(character){
		var atn = character.getCharacterAttributeTotal('Attunement');

		if(atn >= 99) return 10;
		if(atn >= 80) return 9;
		if(atn >= 60) return 8;
		if(atn >= 50) return 7;
		if(atn >= 40) return 6;
		if(atn >= 30) return 5;
		if(atn >= 24) return 4;
		if(atn >= 18) return 3;
		if(atn >= 14) return 2;
		if(atn >= 10) return 1;
		return 0;
	}
));

CharacterStats.addStat(new CharacterStat(
	'Focus Points',
	'base',
	'How many focus points you will have.',
	function(character){
		switch(character.getCharacterAttributeTotal('Attunement')){
			case 1: return 50;
			case 2: return 53;
			case 3: return 58;
			case 4: return 62;
			case 5: return 67;
			case 6: return 72;
			case 7: return 77;
			case 8: return 82;
			case 9: return 87;
			case 10: return 93;
			case 11: return 98;
			case 12: return 103;
			case 13: return 109;
			case 14: return 114;
			case 15: return 120;
			case 16: return 124;
			case 17: return 130;
			case 18: return 136;
			case 19: return 143;
			case 20: return 150;
			case 21: return 157;
			case 22: return 165;
			case 23: return 173;
			case 24: return 181;
			case 25: return 189;
			case 26: return 198;
			case 27: return 206;
			case 28: return 215;
			case 29: return 224;
			case 30: return 233;
			case 31: return 242;
			case 32: return 251;
			case 33: return 260;
			case 34: return 270;
			case 35: return 280;
			case 36: return 283;
			case 37: return 286;
			case 38: return 289;
			case 39: return 293;
			case 40: return 296;
			case 41: return 299;
			case 42: return 302;
			case 43: return 305;
			case 44: return 309;
			case 45: return 312;
			case 46: return 315;
			case 47: return 318;
			case 48: return 320;
			case 49: return 323;
			case 50: return 326;
			case 51: return 329;
			case 52: return 332;
			case 53: return 334;
			case 54: return 337;
			case 55: return 339;
			case 56: return 342;
			case 57: return 344;
			case 58: return 346;
			case 59: return 348;
			case 60: return 350;
			case 61: return 352;
			case 62: return 355;
			case 63: return 358;
			case 64: return 361;
			case 65: return 364;
			case 66: return 366;
			case 67: return 369;
			case 68: return 372;
			case 69: return 375;
			case 70: return 377;
			case 71: return 380;
			case 72: return 383;
			case 73: return 385;
			case 74: return 388;
			case 75: return 391;
			case 76: return 394;
			case 77: return 396;
			case 78: return 399;
			case 79: return 402;
			case 80: return 404;
			case 81: return 407;
			case 82: return 409;
			case 83: return 412;
			case 84: return 415;
			case 85: return 417;
			case 86: return 420;
			case 87: return 422;
			case 88: return 425;
			case 89: return 427;
			case 90: return 430;
			case 91: return 432;
			case 92: return 434;
			case 93: return 437;
			case 94: return 439;
			case 95: return 441;
			case 96: return 444;
			case 97: return 446;
			case 98: return 448;
			case 99: return 450;
		}
		return -1;
	}
));

CharacterStats.addStat(new CharacterStat(
	'Soul Level',
	'level',
	'Total levels needed for this build',
	function(character){
		var soulLevel = character.characterClass.baseLevel;

		character.investedAttributes.getInOrder().forEach(function(attribute,i){
			soulLevel += attribute.value;
		});

		return soulLevel;
	}
));

CharacterStats.addStat(new CharacterStat(
	'Frost Resistance',
	'resistances',
	'Resistance to frost',
	function(character){
		switch(character.getCharacterAttributeTotal('Vigor')){
			case 1: return 91;
			case 2: return 91;
			case 3: return 92;
			case 4: return 92;
			case 5: return 92;
			case 6: return 92;
			case 7: return 92;
			case 8: return 93;
			case 9: return 93;
			case 10: return 93;
			case 11: return 93;
			case 12: return 93;
			case 13: return 94;
			case 14: return 94;
			case 15: return 94;
			case 16: return 94;
			case 17: return 94;
			case 18: return 95;
			case 19: return 95;
			case 20: return 95;
			case 21: return 95;
			case 22: return 95;
			case 23: return 96;
			case 24: return 96;
			case 25: return 96;
			case 26: return 96;
			case 27: return 96;
			case 28: return 97;
			case 29: return 97;
			case 30: return 97;
			case 31: return 100;
			case 32: return 103;
			case 33: return 107;
			case 34: return 110;
			case 35: return 113;
			case 36: return 116;
			case 37: return 119;
			case 38: return 123;
			case 39: return 126;
			case 40: return 129;
			case 41: return 130;
			case 42: return 130;
			case 43: return 131;
			case 44: return 132;
			case 45: return 132;
			case 46: return 133;
			case 47: return 134;
			case 48: return 135;
			case 49: return 135;
			case 50: return 136;
			case 51: return 137;
			case 52: return 137;
			case 53: return 138;
			case 54: return 139;
			case 55: return 139;
			case 56: return 140;
			case 57: return 141;
			case 58: return 142;
			case 59: return 142;
			case 60: return 143;
			case 61: return 143;
			case 62: return 144;
			case 63: return 144;
			case 64: return 145;
			case 65: return 145;
			case 66: return 146;
			case 67: return 146;
			case 68: return 147;
			case 69: return 147;
			case 70: return 148;
			case 71: return 148;
			case 72: return 148;
			case 73: return 149;
			case 74: return 149;
			case 75: return 150;
			case 76: return 150;
			case 77: return 151;
			case 78: return 151;
			case 79: return 152;
			case 80: return 152;
			case 81: return 153;
			case 82: return 153;
			case 83: return 154;
			case 84: return 154;
			case 85: return 154;
			case 86: return 155;
			case 87: return 155;
			case 88: return 156;
			case 89: return 156;
			case 90: return 157;
			case 91: return 157;
			case 92: return 158;
			case 93: return 158;
			case 94: return 159;
			case 95: return 159;
			case 96: return 159;
			case 97: return 160;
			case 98: return 160;
			case 99: return 161;
		}
		return -1;
	}
));

// ------------------------------------------------------------
// 					Character base classes
// ------------------------------------------------------------

CharacterAttributeSet = function(Vigor,Attunement,Endurance,Vitality,Strength,Dexterity,Intelligence,Faith,Luck){
	this.Vigor			= Vigor;
	this.Attunement		= Attunement;
	this.Endurance		= Endurance;
	this.Vitality		= Vitality;
	this.Strength		= Strength;
	this.Dexterity		= Dexterity;
	this.Intelligence	= Intelligence;
	this.Faith			= Faith;
	this.Luck			= Luck;
}

CharacterAttributeSet.prototype.getInOrder = function(){
	return [
		{title:'Vigor',value:this.Vigor},
		{title:'Attunement',value:this.Attunement},
		{title:'Endurance',value:this.Endurance},
		{title:'Vitality',value:this.Vitality},
		{title:'Strength',value:this.Strength},
		{title:'Dexterity',value:this.Dexterity},
		{title:'Intelligence',value:this.Intelligence},
		{title:'Faith',value:this.Faith},
		{title:'Luck',value:this.Luck}
	];
}

CharacterClass = function(title,baseLevel,baseAttributes){
	this.id = -1;
	this.title = title;
	this.baseLevel = baseLevel;
	this.baseAttributes = baseAttributes;
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

CharacterClasses.addCharacterClass(new CharacterClass(    'Knight',  9, new CharacterAttributeSet( 12, 10, 11, 15, 13, 12,  9,  9,  7)));
CharacterClasses.addCharacterClass(new CharacterClass( 'Mercenary',  8, new CharacterAttributeSet( 11, 12, 11, 10, 10, 16, 10,  8,  9)));
CharacterClasses.addCharacterClass(new CharacterClass(   'Warrior',  7, new CharacterAttributeSet( 14,  6, 12, 11, 16,  9,  8,  9, 11)));
CharacterClasses.addCharacterClass(new CharacterClass(    'Herald',  9, new CharacterAttributeSet( 12, 10,  9, 12, 12, 11,  8, 13, 11)));
CharacterClasses.addCharacterClass(new CharacterClass(     'Thief',  5, new CharacterAttributeSet( 10, 11, 10,  9,  9, 13, 10,  8, 14)));
CharacterClasses.addCharacterClass(new CharacterClass(  'Assassin', 10, new CharacterAttributeSet( 10, 14, 11, 10, 10, 14, 11,  9, 10)));
CharacterClasses.addCharacterClass(new CharacterClass(  'Sorcerer',  6, new CharacterAttributeSet(  9, 16,  9,  7,  7, 12, 16,  7, 12)));
CharacterClasses.addCharacterClass(new CharacterClass('Pyromancer',  8, new CharacterAttributeSet( 11, 12, 10,  8, 12,  9, 14, 14,  7)));
CharacterClasses.addCharacterClass(new CharacterClass(    'Cleric',  7, new CharacterAttributeSet( 10, 14,  9,  7, 12,  8,  7, 16, 13)));
CharacterClasses.addCharacterClass(new CharacterClass(  'Deprived',  1, new CharacterAttributeSet( 10, 10, 10, 10, 10, 10, 10, 10, 10)));

// ------------------------------------------------------------
//					The user's character build
// ------------------------------------------------------------

CharacterBuildStat = function(stat,value){
	this.stat = stat;
	this.value = value;
}

CharacterBuild = function(characterClass){
	this.title = 'Untitled';
	this.characterClass = characterClass || CharacterClasses.getCharacterClass('Deprived');
	this.investedAttributes = new CharacterAttributeSet(0,0,0,0,0,0,0,0,0);
}

CharacterBuild.prototype.getBuildStatsByCategory = function(category){
	var build = this;
	var stats = CharacterStats.getStatsByCategory(category);
	var buildStats = [];

	stats.forEach(function(stat,i){
		buildStats.push(new CharacterBuildStat(stat,stat.getValueFor(build)));
	});

	return buildStats;
}

CharacterBuild.prototype.getLevel = function(){
	return this.characterClass.baseLevel + this.investedLevels;
}

CharacterBuild.prototype.getCharacterAttributeTotal = function(attribute){
	return this.characterClass.baseAttributes[attribute] + this.investedAttributes[attribute];
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