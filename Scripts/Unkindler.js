

// ------------------------------------------------------------
// 					Character stat management
//				Note: 
//						attributes = (set) a thing the player can change (STR,DEX,ATN,etc... Maybe also current Equip Load and weapons later)
//						stats = (calculated) a thing about the character affected by attributes (HP, FP, etc.)
//											
// ------------------------------------------------------------

CharacterStat = function(internalName,title,description,getValueFor){
	this.internalName = internalName;
	this.title = title;
	this.description = description;
	this.getValueFor = getValueFor;
}

CharacterStats = function(){
	var _stats = {};

	return {
		addStat: function(characterStat){
			_stats[characterStat.internalName] = characterStat;
		},
		getStat: function(statInternalName){
			return _stats[statInternalName];
		}
	};
}();

//1-99, first nine values are dummy values
var HP_BY_VIGOR = [403,403,403,403,403,403,403,403,403,403,427,454,483,515,550,594,638,681,723,764,804,842,879,914,947,977,1000,1019,1038,1056,1074,1092,1109,1125,1141,1157,1172,1186,1200,1213,1226,1238,1249,1260,1269,1278,1285,1292,1297,1300,1302,1304,1307,1309,1312,1314,1316,1319,1321,1323,1326,1328,1330,1333,1335,1337,1340,1342,1344,1346,1348,1351,1353,1355,1357,1359,1361,1363,1365,1367,1369,1371,1373,1375,1377,1379,1381,1383,1385,1386,1388,1390,1391,1393,1395,1396,1397,1399,1400];

CharacterStats.addStat(new CharacterStat('healthPoints','Health Points (Unembered)','(Vigor)',function(characterBuild){
	return HP_BY_VIGOR[characterBuild.getAttributeTotal('Vigor')-1];
}));

CharacterStats.addStat(new CharacterStat('emberedHealthPoints','Health Points (Embered)','(Vigor)',function(characterBuild){
	return Math.round(HP_BY_VIGOR[characterBuild.getAttributeTotal('Vigor')-1] * 1.3);
}));

CharacterStats.addStat(new CharacterStat('equipMax','Equip Load Max','(Vitality)',function(characterBuild){
	return characterBuild.getAttributeTotal('Vitality') + 40;
}));

CharacterStats.addStat(new CharacterStat('attunementSlots','Attunement Slots','(Attunement)',function(characterBuild){
		var atn = characterBuild.getAttributeTotal('Attunement');

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
}));

//1-99
var FP_BY_ATTUNEMENT = [50,53,58,62,67,72,77,82,87,93,98,103,109,114,120,124,130,136,143,150,157,165,173,181,189,198,206,215,224,233,242,251,260,270,280,283,286,289,293,296,299,302,305,309,312,315,318,320,323,326,329,332,334,337,339,342,344,346,348,350,352,355,358,361,364,366,369,372,375,377,380,383,385,388,391,394,396,399,402,404,407,409,412,415,417,420,422,425,427,430,432,434,437,439,441,444,446,448,450];

CharacterStats.addStat(new CharacterStat('focusPoints','Focus Points','(Attunement)',function(characterBuild){
	return FP_BY_ATTUNEMENT[characterBuild.getAttributeTotal('Attunement')-1];
}));

CharacterStats.addStat(new CharacterStat('soulLevel','Soul Level','(All Attributes)',function(characterBuild){
	var soulLevel = characterBuild.characterClass.baseLevel;

	for(var p in characterBuild.investedAttributes){
		soulLevel += characterBuild.investedAttributes[p];
	}

	return soulLevel;
}));

CharacterStats.addStat(new CharacterStat('stamina','Stamina','(Endurance)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('castingSpeed','Casting Speed','(Dexterity)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('physicalDefense','Physical Defense','(Vitality)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('physicalDefenseStrike','Physical Defense VS Strike','(Vitality)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('physicalDefenseSlash','Physical Defense VS Slash','(Vitality)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('physicalDefenseThrust','Physical Defense VS Thrust','(Vitality)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('magicDefense','Magic Defense','(Intelligence)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('fireDefense','Fire Defense','(Strength)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('lightningDefense','Lightning Defense','(Endurance)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('darkDefense','Dark Defense','(Faith)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('bleedResistance','Bleed Resistance','(Endurance)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('poisonResistance','Poison Resistance','(Vitality)',function(characterBuild){
	return -1;
}));

CharacterStats.addStat(new CharacterStat('curseResistance','Curse Resistance','(Luck)',function(characterBuild){
	return -1;
}));

var FROSTDEF_BY_VIGOR = [91,91,92,92,92,92,92,93,93,93,93,93,94,94,94,94,94,95,95,95,95,95,96,96,96,96,96,97,97,97,100,103,107,110,113,116,119,123,126,129,130,130,131,132,132,133,134,135,135,136,137,137,138,139,139,140,141,142,142,143,143,144,144,145,145,146,146,147,147,148,148,148,149,149,150,150,151,151,152,152,153,153,154,154,154,155,155,156,156,157,157,158,158,159,159,159,160,160,161];

CharacterStats.addStat(new CharacterStat('frostResistance','Frost Resistance','(Vigor)',function(characterBuild){
	return FROSTDEF_BY_VIGOR[characterBuild.getAttributeTotal('Vigor')-1];
}));

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

CharacterClass = function(title,baseAttributes){
	this.id = -1;
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

CharacterClasses.addCharacterClass(new CharacterClass(    'Knight', new CharacterAttributeSet( 12, 10, 11, 15, 13, 12,  9,  9,  7)));
CharacterClasses.addCharacterClass(new CharacterClass( 'Mercenary', new CharacterAttributeSet( 11, 12, 11, 10, 10, 16, 10,  8,  9)));
CharacterClasses.addCharacterClass(new CharacterClass(   'Warrior', new CharacterAttributeSet( 14,  6, 12, 11, 16,  9,  8,  9, 11)));
CharacterClasses.addCharacterClass(new CharacterClass(    'Herald', new CharacterAttributeSet( 12, 10,  9, 12, 12, 11,  8, 13, 11)));
CharacterClasses.addCharacterClass(new CharacterClass(     'Thief', new CharacterAttributeSet( 10, 11, 10,  9,  9, 13, 10,  8, 14)));
CharacterClasses.addCharacterClass(new CharacterClass(  'Assassin', new CharacterAttributeSet( 10, 14, 11, 10, 10, 14, 11,  9, 10)));
CharacterClasses.addCharacterClass(new CharacterClass(  'Sorcerer', new CharacterAttributeSet(  9, 16,  9,  7,  7, 12, 16,  7, 12)));
CharacterClasses.addCharacterClass(new CharacterClass('Pyromancer', new CharacterAttributeSet( 11, 12, 10,  8, 12,  9, 14, 14,  7)));
CharacterClasses.addCharacterClass(new CharacterClass(    'Cleric', new CharacterAttributeSet( 10, 14,  9,  7, 12,  8,  7, 16, 13)));
CharacterClasses.addCharacterClass(new CharacterClass(  'Deprived', new CharacterAttributeSet( 10, 10, 10, 10, 10, 10, 10, 10, 10)));

// ------------------------------------------------------------
//					The user's character build
// ------------------------------------------------------------
CharacterBuild = function(characterClass){
	this.title = 'Untitled';
	this.characterClass = characterClass || CharacterClasses.getCharacterClass('Deprived');
	this.investedAttributes = new CharacterAttributeSet(0,0,0,0,0,0,0,0,0);
}

CharacterBuild.prototype.getLevel = function(){
	return this.characterClass.baseLevel + this.investedLevels;
}

CharacterBuild.prototype.getAttributeTotal = function(attribute){
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