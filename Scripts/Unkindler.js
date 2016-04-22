// ------------------------------------------------------------
// 					Character stat management
//				Note: 
//						attributes = (set) a thing the player can change (STR,DEX,ATN,etc... Maybe also current Equip Load and weapons later)
//						stats = (calculated) a thing about the character affected by attributes (HP, FP, etc.)
//											
// ------------------------------------------------------------
CharacterAttribute = function(){
	this.id = -1;
	this.title = title;
	this.description = description;
	this.min = min;
	this.max = max;
	this.value = value;
}

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
		switch(character.getAttributeValue('vigor')){
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
		return character.getAttributeValue('vitality') + 40;
	}
));

CharacterStats.addStat(new CharacterStat(
	'Attunement Slots',
	'base',
	'How many spell slots you can attune at bonfires',
	function(character){
		var atn = character.getAttributeValue('attunement');

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
		switch(character.getAttributeValue('attunement')){
			default: return 72;//case 6
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
	}
));

CharacterStats.addStat(new CharacterStat(
	'Soul Level',
	'level',
	'Total levels needed for this build',
	function(character){
		var soulLevel = character.characterClass.baseLevel;

		for(var p in character.attributeInvestments){
			soulLevel += character.attributeInvestments[p];
		}

		return soulLevel;
	}
));

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
	this.attributeInvestments = new CharacterAttributeSet(0,0,0,0,0,0,0,0,0);
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

CharacterBuild.prototype.getAttributeValue = function(attribute){
	return this.characterClass.baseAttributes[attribute] + this.attributeInvestments[attribute];
}

CharacterBuild.prototype.setCharacterClass = function(characterClass){
	this.characterClass = characterClass;
}