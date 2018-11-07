/*
 * MIT License
 *
 * Copyright (c) 2018 Nikola Jakšić
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Set the default text that is displayed in the first suggestion row underneath the URL bar.
chrome.omnibox.setDefaultSuggestion({description: 'Search DotA 2 for <match>%s</match>'});

// This event is fired each time the user updates the text in the Omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener((query, suggest) => {
    // If there is no text in the Omnibox, no need to suggest anything, just return from the function
    if (!query)
        return;

    // Suggestions to show to the user
    const suggestions = [];

    // Merge heroes and items into one array so we can filter all the elements
    const all = heroes.concat(items);

    all.forEach(item => {
        const queryLower = query.toLowerCase();
        const nameLower = item.name.toLowerCase();

        if (nameLower.includes(queryLower)) {
            const suggestion = {
                content: item.path,
                description: item.name
            };

            highlightSuggestion(query, suggestion);

            suggestions.push(suggestion);
        }
    });

    suggestions.sort((a, b) => compareSuggestions(query, a.description, b.description));

    suggest(suggestions);
});

// This event is fired when the user accepts the input in the Omnibox.
chrome.omnibox.onInputEntered.addListener(text => chrome.tabs.update({url: "https://dota2.gamepedia.com/" + text}));

function compareSuggestions(query, suggestion1, suggestion2) {
    query = query.toLowerCase();
    suggestion1 = suggestion1.toLowerCase();
    suggestion2 = suggestion2.toLowerCase();

    // Check if both of them start with the same text and if so, sort them lexicographically
    if (suggestion1.startsWith(query) && suggestion2.startsWith(query)) {
        if (suggestion1 > suggestion2) return 1;
        else return -1;
    }

    // Check if neither of them start with the same text and if so, sort them lexicographically
    if (!suggestion1.startsWith(query) && !suggestion2.startsWith(query)) {
        if (suggestion1 > suggestion2) return 1;
        else return -1;
    }

    if (suggestion1.startsWith(query))
        return -1;

    if (suggestion2.startsWith(query))
        return 1;
}

function highlightSuggestion(query, suggestion) {
    const regex = new RegExp(query, "i"); // 'i' means ignore case

    // query = spirit
    // suggestion.description = Earth Spirit
    // start = 6
    // end = 12
    // substring = Spirit
    const start = suggestion.description.toLowerCase().indexOf(query.toLowerCase());
    const end = start + query.length;
    const substring = suggestion.description.substring(start, end); // string to highlight

    suggestion.description = suggestion.description.replace(regex, `<match>${substring}</match>`);
}

const heroes = [
    {name: "Abaddon", path: "Abaddon"},
    {name: "Alchemist", path: "Alchemist"},
    {name: "Axe", path: "Axe"},
    {name: "Beastmaster", path: "Beastmaster"},
    {name: "Brewmaster", path: "Brewmaster"},
    {name: "Bristleback", path: "Bristleback"},
    {name: "Centaur Warrunner", path: "Centaur_Warrunner"},
    {name: "Chaos Knight", path: "Chaos_Knight"},
    {name: "Clockwerk", path: "Clockwerk"},
    {name: "Doom", path: "Doom"},
    {name: "Dragon Knight", path: "Dragon_Knight"},
    {name: "Earth Spirit", path: "Earth_Spirit"},
    {name: "Earthshaker", path: "Earthshaker"},
    {name: "Elder Titan", path: "Elder_Titan"},
    {name: "Huskar", path: "Huskar"},
    {name: "Io", path: "Io"},
    {name: "Kunkka", path: "Kunkka"},
    {name: "Legion Commander", path: "Legion_Commander"},
    {name: "Lifestealer", path: "Lifestealer"},
    {name: "Lycan", path: "Lycan"},
    {name: "Magnus", path: "Magnus"},
    {name: "Night Stalker", path: "Night_Stalker"},
    {name: "Omniknight", path: "Omniknight"},
    {name: "Phoenix", path: "Phoenix"},
    {name: "Pudge", path: "Pudge"},
    {name: "Sand King", path: "Sand_King"},
    {name: "Slardar", path: "Slardar"},
    {name: "Spirit Breaker", path: "Spirit_Breaker"},
    {name: "Sven", path: "Sven"},
    {name: "Tidehunter", path: "Tidehunter"},
    {name: "Timbersaw", path: "Timbersaw"},
    {name: "Tiny", path: "Tiny"},
    {name: "Treant Protector", path: "Treant_Protector"},
    {name: "Tusk", path: "Tusk"},
    {name: "Underlord", path: "Underlord"},
    {name: "Undying", path: "Undying"},
    {name: "Wraith King", path: "Wraith_King"},
    {name: "Anti-Mage", path: "Anti-Mage"},
    {name: "Arc Warden", path: "Arc_Warden"},
    {name: "Bloodseeker", path: "Bloodseeker"},
    {name: "Bounty Hunter", path: "Bounty_Hunter"},
    {name: "Broodmother", path: "Broodmother"},
    {name: "Clinkz", path: "Clinkz"},
    {name: "Drow Ranger", path: "Drow_Ranger"},
    {name: "Ember Spirit", path: "Ember_Spirit"},
    {name: "Faceless Void", path: "Faceless_Void"},
    {name: "Gyrocopter", path: "Gyrocopter"},
    {name: "Juggernaut", path: "Juggernaut"},
    {name: "Lone Druid", path: "Lone_Druid"},
    {name: "Luna", path: "Luna"},
    {name: "Medusa", path: "Medusa"},
    {name: "Meepo", path: "Meepo"},
    {name: "Mirana", path: "Mirana"},
    {name: "Monkey King", path: "Monkey_King"},
    {name: "Morphling", path: "Morphling"},
    {name: "Naga Siren", path: "Naga_Siren"},
    {name: "Nyx Assassin", path: "Nyx_Assassin"},
    {name: "Pangolier", path: "Pangolier"},
    {name: "Phantom Assassin", path: "Phantom_Assassin"},
    {name: "Phantom Lancer", path: "Phantom_Lancer"},
    {name: "Razor", path: "Razor"},
    {name: "Riki", path: "Riki"},
    {name: "Shadow Fiend", path: "Shadow_Fiend"},
    {name: "Slark", path: "Slark"},
    {name: "Sniper", path: "Sniper"},
    {name: "Spectre", path: "Spectre"},
    {name: "Templar Assassin", path: "Templar_Assassin"},
    {name: "Terrorblade", path: "Terrorblade"},
    {name: "Troll Warlord", path: "Troll_Warlord"},
    {name: "Ursa", path: "Ursa"},
    {name: "Vengeful Spirit", path: "Vengeful_Spirit"},
    {name: "Venomancer", path: "Venomancer"},
    {name: "Viper", path: "Viper"},
    {name: "Weaver", path: "Weaver"},
    {name: "Ancient Apparition", path: "Ancient_Apparition"},
    {name: "Bane", path: "Bane"},
    {name: "Batrider", path: "Batrider"},
    {name: "Chen", path: "Chen"},
    {name: "Crystal Maiden", path: "Crystal_Maiden"},
    {name: "Dark Seer", path: "Dark_Seer"},
    {name: "Dark Willow", path: "Dark_Willow"},
    {name: "Dazzle", path: "Dazzle"},
    {name: "Death Prophet", path: "Death_Prophet"},
    {name: "Disruptor", path: "Disruptor"},
    {name: "Enchantress", path: "Enchantress"},
    {name: "Enigma", path: "Enigma"},
    {name: "Grimstroke", path: "Grimstroke"},
    {name: "Invoker", path: "Invoker"},
    {name: "Jakiro", path: "Jakiro"},
    {name: "Keeper of the Light", path: "Keeper_of_the_Light"},
    {name: "Leshrac", path: "Leshrac"},
    {name: "Lich", path: "Lich"},
    {name: "Lina", path: "Lina"},
    {name: "Lion", path: "Lion"},
    {name: "Nature's Prophet", path: "Nature%27s_Prophet"},
    {name: "Necrophos", path: "Necrophos"},
    {name: "Ogre Magi", path: "Ogre_Magi"},
    {name: "Oracle", path: "Oracle"},
    {name: "Outworld Devourer", path: "Outworld_Devourer"},
    {name: "Puck", path: "Puck"},
    {name: "Pugna", path: "Pugna"},
    {name: "Queen of Pain", path: "Queen_of_Pain"},
    {name: "Rubick", path: "Rubick"},
    {name: "Shadow Demon", path: "Shadow_Demon"},
    {name: "Shadow Shaman", path: "Shadow_Shaman"},
    {name: "Silencer", path: "Silencer"},
    {name: "Skywrath Mage", path: "Skywrath_Mage"},
    {name: "Storm Spirit", path: "Storm_Spirit"},
    {name: "Techies", path: "Techies"},
    {name: "Tinker", path: "Tinker"},
    {name: "Visage", path: "Visage"},
    {name: "Warlock", path: "Warlock"},
    {name: "Windranger", path: "Windranger"},
    {name: "Winter Wyvern", path: "Winter_Wyvern"},
    {name: "Witch Doctor", path: "Witch_Doctor"},
    {name: "Zeus", path: "Zeus"}];

const items = [
    {name: "Animal Courier", path: "Animal_Courier_(Item)"},
    {name: "Clarity", path: "Clarity"},
    {name: "Town Portal Scroll", path: "Town_Portal_Scroll"},
    {name: "Enchanted Mango", path: "Enchanted_Mango"},
    {name: "Faerie Fire", path: "Faerie_Fire"},
    {name: "Observer Ward", path: "Observer_Ward"},
    {name: "Smoke of Deceit", path: "Smoke_of_Deceit"},
    {name: "Tango", path: "Tango"},
    {name: "Sentry Ward", path: "Sentry_Ward"},
    {name: "Healing Salve", path: "Healing_Salve"},
    {name: "Tome of Knowledge", path: "Tome_of_Knowledge"},
    {name: "Dust of Appearance", path: "Dust_of_Appearance"},
    {name: "Bottle", path: "Bottle"},
    {name: "Iron Branch", path: "Iron_Branch"},
    {name: "Gauntlets of Strength", path: "Gauntlets_of_Strength"},
    {name: "Mantle of Intelligence", path: "Mantle_of_Intelligence"},
    {name: "Slippers of Agility", path: "Slippers_of_Agility"},
    {name: "Circlet", path: "Circlet"},
    {name: "Band of Elvenskin", path: "Band_of_Elvenskin"},
    {name: "Belt of Strength", path: "Belt_of_Strength"},
    {name: "Robe of the Magi", path: "Robe_of_the_Magi"},
    {name: "Blade of Alacrity", path: "Blade_of_Alacrity"},
    {name: "Ogre Axe", path: "Ogre_Axe"},
    {name: "Staff of Wizardry", path: "Staff_of_Wizardry"},
    {name: "Ring of Protection", path: "Ring_of_Protection"},
    {name: "Quelling Blade", path: "Quelling_Blade"},
    {name: "Stout Shield", path: "Stout_Shield"},
    {name: "Infused Raindrop", path: "Infused_Raindrop"},
    {name: "Orb of Venom", path: "Orb_of_Venom"},
    {name: "Blight Stone", path: "Blight_Stone"},
    {name: "Blades of Attack", path: "Blades_of_Attack"},
    {name: "Chainmail", path: "Chainmail"},
    {name: "Quarterstaff", path: "Quarterstaff"},
    {name: "Helm of Iron Will", path: "Helm_of_Iron_Will"},
    {name: "Javelin", path: "Javelin"},
    {name: "Broadsword", path: "Broadsword"},
    {name: "Claymore", path: "Claymore"},
    {name: "Mithril Hammer", path: "Mithril_Hammer"},
    {name: "Magic Stick", path: "Magic_Stick"},
    {name: "Wind Lace", path: "Wind_Lace"},
    {name: "Ring of Regen", path: "Ring_of_Regen"},
    {name: "Sage's Mask", path: "Sage%27s_Mask"},
    {name: "Boots of Speed", path: "Boots_of_Speed"},
    {name: "Gloves of Haste", path: "Gloves_of_Haste"},
    {name: "Cloak", path: "Cloak"},
    {name: "Ring of Health", path: "Ring_of_Health"},
    {name: "Void Stone", path: "Void_Stone"},
    {name: "Gem of True Sight", path: "Gem_of_True_Sight"},
    {name: "Morbid Mask", path: "Morbid_Mask"},
    {name: "Shadow Amulet", path: "Shadow_Amulet"},
    {name: "Ghost Scepter", path: "Ghost_Scepter"},
    {name: "Blink Dagger", path: "Blink_Dagger"},
    {name: "Energy Booster", path: "Energy_Booster"},
    {name: "Vitality Booster", path: "Vitality_Booster"},
    {name: "Point Booster", path: "Point_Booster"},
    {name: "Platemail", path: "Platemail"},
    {name: "Talisman of Evasion", path: "Talisman_of_Evasion"},
    {name: "Hyperstone", path: "Hyperstone"},
    {name: "Ultimate Orb", path: "Ultimate_Orb"},
    {name: "Demon Edge", path: "Demon_Edge"},
    {name: "Mystic Staff", path: "Mystic_Staff"},
    {name: "Reaver", path: "Reaver"},
    {name: "Eaglesong", path: "Eaglesong"},
    {name: "Sacred Relic", path: "Sacred_Relic"},
    {name: "Magic Wand", path: "Magic_Wand"},
    {name: "Bracer", path: "Bracer"},
    {name: "Null Talisman", path: "Null_Talisman"},
    {name: "Wraith Band", path: "Wraith_Band"},
    {name: "Soul Ring", path: "Soul_Ring"},
    {name: "Phase Boots", path: "Phase_Boots"},
    {name: "Power Treads (Agility)", path: "Power_Treads_(Agility)"},
    {name: "Power Treads (Intelligence)", path: "Power_Treads_(Intelligence)"},
    {name: "Power Treads (Strength)", path: "Power_Treads_(Strength)"},
    {name: "Oblivion Staff", path: "Oblivion_Staff"},
    {name: "Perseverance", path: "Perseverance"},
    {name: "Hand of Midas", path: "Hand_of_Midas"},
    {name: "Boots of Travel 1", path: "Boots_of_Travel_1"},
    {name: "Moon Shard", path: "Moon_Shard"},
    {name: "Boots of Travel 2", path: "Boots_of_Travel_2"},
    {name: "Ring of Basilius", path: "Ring_of_Basilius"},
    {name: "Headdress", path: "Headdress"},
    {name: "Buckler", path: "Buckler"},
    {name: "Urn of Shadows", path: "Urn_of_Shadows"},
    {name: "Ring of Aquila", path: "Ring_of_Aquila"},
    {name: "Tranquil Boots", path: "Tranquil_Boots"},
    {name: "Medallion of Courage", path: "Medallion_of_Courage"},
    {name: "Arcane Boots", path: "Arcane_Boots"},
    {name: "Drum of Endurance", path: "Drum_of_Endurance"},
    {name: "Vladmir's Offering", path: "Vladmir%27s_Offering"},
    {name: "Mekansm", path: "Mekansm"},
    {name: "Spirit Vessel", path: "Spirit_Vessel"},
    {name: "Pipe of Insight", path: "Pipe_of_Insight"},
    {name: "Guardian Greaves", path: "Guardian_Greaves"},
    {name: "Glimmer Cape", path: "Glimmer_Cape"},
    {name: "Force Staff", path: "Force_Staff"},
    {name: "Veil of Discord", path: "Veil_of_Discord"},
    {name: "Aether Lens", path: "Aether_Lens"},
    {name: "Necronomicon 1", path: "Necronomicon_1"},
    {name: "Solar Crest", path: "Solar_Crest"},
    {name: "Dagon 1", path: "Dagon_1"},
    {name: "Eul's Scepter of Divinity", path: "Eul%27s_Scepter_of_Divinity"},
    {name: "Rod of Atos", path: "Rod_of_Atos"},
    {name: "Necronomicon 2", path: "Necronomicon_2"},
    {name: "Dagon 2", path: "Dagon_2"},
    {name: "Orchid Malevolence", path: "Orchid_Malevolence"},
    {name: "Aghanim's Scepter", path: "Aghanim%27s_Scepter"},
    {name: "Nullifier", path: "Nullifier"},
    {name: "Necronomicon 3", path: "Necronomicon_3"},
    {name: "Refresher Orb", path: "Refresher_Orb"},
    {name: "Dagon 3", path: "Dagon_3"},
    {name: "Scythe of Vyse", path: "Scythe_of_Vyse"},
    {name: "Octarine Core", path: "Octarine_Core"},
    {name: "Dagon 4", path: "Dagon_4"},
    {name: "Dagon 5", path: "Dagon_5"},
    {name: "Hood of Defiance", path: "Hood_of_Defiance"},
    {name: "Vanguard", path: "Vanguard"},
    {name: "Blade Mail", path: "Blade_Mail"},
    {name: "Soul Booster", path: "Soul_Booster"},
    {name: "Aeon Disk", path: "Aeon_Disk"},
    {name: "Crimson Guard", path: "Crimson_Guard"},
    {name: "Black King Bar", path: "Black_King_Bar"},
    {name: "Lotus Orb", path: "Lotus_Orb"},
    {name: "Hurricane Pike", path: "Hurricane_Pike"},
    {name: "Shiva's Guard", path: "Shiva%27s_Guard"},
    {name: "Manta Style", path: "Manta_Style"},
    {name: "Bloodstone", path: "Bloodstone"},
    {name: "Linken's Sphere", path: "Linken%27s_Sphere"},
    {name: "Heart of Tarrasque", path: "Heart_of_Tarrasque"},
    {name: "Assault Cuirass", path: "Assault_Cuirass"},
    {name: "Crystalys", path: "Crystalys"},
    {name: "Armlet of Mordiggian", path: "Armlet_of_Mordiggian"},
    {name: "Meteor Hammer", path: "Meteor_Hammer"},
    {name: "Shadow Blade", path: "Shadow_Blade"},
    {name: "Skull Basher", path: "Skull_Basher"},
    {name: "Monkey King Bar", path: "Monkey_King_Bar"},
    {name: "Battle Fury", path: "Battle_Fury"},
    {name: "Ethereal Blade", path: "Ethereal_Blade"},
    {name: "Radiance", path: "Radiance"},
    {name: "Daedalus", path: "Daedalus"},
    {name: "Butterfly", path: "Butterfly"},
    {name: "Silver Edge", path: "Silver_Edge"},
    {name: "Divine Rapier", path: "Divine_Rapier"},
    {name: "Abyssal Blade", path: "Abyssal_Blade"},
    {name: "Bloodthorn", path: "Bloodthorn"},
    {name: "Dragon Lance", path: "Dragon_Lance"},
    {name: "Kaya", path: "Kaya"},
    {name: "Mask of Madness", path: "Mask_of_Madness"},
    {name: "Helm of the Dominator", path: "Helm_of_the_Dominator"},
    {name: "Sange", path: "Sange"},
    {name: "Yasha", path: "Yasha"},
    {name: "Echo Sabre", path: "Echo_Sabre"},
    {name: "Maelstrom", path: "Maelstrom"},
    {name: "Diffusal Blade", path: "Diffusal_Blade"},
    {name: "Desolator", path: "Desolator"},
    {name: "Heaven's Halberd", path: "Heaven%27s_Halberd"},
    {name: "Sange and Yasha", path: "Sange_and_Yasha"},
    {name: "Eye of Skadi", path: "Eye_of_Skadi"},
    {name: "Satanic", path: "Satanic"},
    {name: "Mjollnir", path: "Mjollnir"},
    {name: "Aegis of the Immortal", path: "Aegis_of_the_Immortal"},
    {name: "Cheese", path: "Cheese"},
    {name: "Refresher Shard", path: "Refresher_Shard"}];