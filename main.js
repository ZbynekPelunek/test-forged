function generateItem() {
    const items = createItems();

    const randomIndex = Math.floor(Math.random() * items.length);
    const itemPick = items[randomIndex];
    const itemName = document.getElementById('itemName');
    const itemStats = document.getElementById('itemStats');

    itemPick.upgrade(); //this roll the dices if the item upgrades, and if yes, how much

    itemName.innerHTML = itemPick.name;
    itemName.style.color = colorItemName(itemPick.upgradeLevel); //changes the color depending on the upgrade to show quality of the item
    document.getElementById('itemLevel').innerHTML = itemPick.ilvl;
    itemStats.innerHTML = showStats(itemPick.str, itemPick.dex, itemPick.int, itemPick.stam, itemPick.ap, itemPick.sp);
};

function createItems() {
    const item = (_ilvl, _name, _str, _dex, _int, _stam, _ap, _sp) => {
        return {
            _ilvl,
            _name,
            _str,
            _dex,
            _int,
            _stam,
            _ap,
            _sp,
            _upgradeLevel: 0,

            get ilvl () {
                return this._ilvl;
            },
            get name () {
                return this._name;
            },
            get str () {
                return this._str;
            },
            get dex () {
                return this._dex;
            },
            get int () {
                return this._int;
            },
            get stam () {
                return this._stam;
            },
            get ap () {
                return this._ap;
            },
            get sp () {
                return this._sp;
            },
            get upgradeLevel () {
                return this._upgradeLevel;
            },

            set ilvl (value) {
                this._ilvl = value;
            },
            set name (value) {
                this._name = value;
            },
            set str (value) {
                if(this._str > 0){
                    this._str = value;
                };
            },
            set dex (value) {
                if(this._dex > 0){
                    this._dex = value;
                };
            },
            set int (value) {
                if(this._int > 0){
                    this._int = value;
                };
            },
            set stam (value) {
                if(this._stam > 0){
                    this._stam = value;
                };
            },
            set ap (value) {
                if(this._ap > 0){
                    this._ap = value;
                };   
            },
            set sp (value) {
                if(this._sp > 0){
                    this._sp = value;
                };
            },
            set upgradeLevel (value) {
                this._upgradeLevel = value;
            },
            upgrade () {
                let howManyUpgrades = 0;
    
                for (let i = 0; i < 40; i += 4){
                    //can upgrade the item up to 10 times, however, the chance is lower the higher it gets
                    //for exaple: now the chance to first upgrade is 50%, then if it upgrades chance to upgrade again is 46%, down to 10% for last upgrade.
                    const roll = Math.floor(Math.random() * 100);
                    if (roll > (50 + i)) {
                        howManyUpgrades++;
                    };
                };
    
                this.ilvl += (howManyUpgrades * 5); //item level serves the purpose to show how many times the item upgraded

                if(howManyUpgrades > 0){
                    this.str += (howManyUpgrades * 10);
                    this.dex += (howManyUpgrades * 10);
                    this.int += (howManyUpgrades * 10);
                    this.stam += (howManyUpgrades * 10);
                    this.ap += (howManyUpgrades * 15);
                    this.sp += (howManyUpgrades * 15);
                    this.upgradeLevel = howManyUpgrades;
                };
            }
        }
    };

    //WEAPONS
    const strWeapon1 = item(100, 'Axe of Strength', 25, 0, 0, 32, 100, 0);
    const dexWeapon1 = item(100, 'Dagger of Dexterity', 0, 25, 0, 32, 200, 0);
    const intWeapon1 = item(100, 'Staff of Intellect', 0, 0, 25, 32, 0, 150);

    //EQUIPMENT
    const strHelm1 = item(100, 'Plate Helm', 10, 0, 0, 25, 5, 0);
    const dexHelm1 = item(100, 'Leather Helm', 0, 10, 0, 25, 5, 0);
    const intHelm1 = item(100, 'Cloth Helm', 0, 0, 10, 25, 0, 5);
    
    return [strWeapon1, dexWeapon1, intWeapon1, strHelm1, dexHelm1, intHelm1];

};

const showStats = (str, dex, int, stam, ap, sp) => {

    //the item shouldnt show stats that have no value
    //couldnt figure out better way to do it
    finalText = '';
    if(str > 0){
        finalText += `Strength +${str}<br>`;
    };
    if(dex > 0){
        finalText += `Dexterity +${dex}<br>`;
    };
    if(int > 0){
        finalText += `Intellect +${int}<br>`;
    };
    if(stam > 0){
        finalText += `Stamina +${stam}<br>`;
    };
    if(ap > 0){
        finalText += `Attack Power +${ap}`;
    };
    if(sp > 0){
        finalText += `Spell Power +${sp}`;
    };

    return finalText;
};

const colorItemName = upgradeLevel => {
    //similar to most RPG colors used to identify quality of item
    switch (upgradeLevel){
        case 10:
            return 'orange'; //orange = legendary
        case 9:
        case 8:
        case 7:
        case 6:
            return 'purple'; //purple = epic
        case 5:
        case 4:
        case 3:
            return 'blue'; //blue = rare
        case 2:
        case 1:
            return 'green'; //green = uncommon
        case 0:
            return 'white'; //white = common
        default:
            return 'black'; //item should never have this color
    }
};