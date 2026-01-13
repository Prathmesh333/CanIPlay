/**
 * Game Server Database with Real Logos
 * Comprehensive regional server locations
 */

const SIMPLE_ICONS_CDN = 'https://cdn.simpleicons.org';

const GAME_SERVERS = [
    // ==================== VALORANT - Multiple Regions ====================
    {
        id: 'valorant-mumbai',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Mumbai',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Mumbai, India'
    },
    {
        id: 'valorant-singapore',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Singapore',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Singapore'
    },
    {
        id: 'valorant-tokyo',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Tokyo',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Tokyo, Japan'
    },
    {
        id: 'valorant-seoul',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Seoul',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Seoul, Korea'
    },
    {
        id: 'valorant-hongkong',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Hong Kong',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Hong Kong'
    },
    {
        id: 'valorant-frankfurt',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Frankfurt',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Frankfurt, Germany'
    },
    {
        id: 'valorant-london',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'London',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'London, UK'
    },
    {
        id: 'valorant-paris',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'Paris',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Paris, France'
    },
    {
        id: 'valorant-useast',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'US East',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Virginia, USA'
    },
    {
        id: 'valorant-uswest',
        name: 'Valorant',
        publisher: 'Riot Games',
        region: 'US West',
        logo: `${SIMPLE_ICONS_CDN}/valorant`,
        color: '#ff4655',
        testEndpoint: 'https://playvalorant.com/favicon.ico',
        displayEndpoint: 'Oregon, USA'
    },

    // ==================== LEAGUE OF LEGENDS ====================
    {
        id: 'lol-na',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'North America',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
        displayEndpoint: 'Chicago, Illinois'
    },
    {
        id: 'lol-euw',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'EU West',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg',
        displayEndpoint: 'Amsterdam, Netherlands'
    },
    {
        id: 'lol-eune',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'EU Nordic & East',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
        displayEndpoint: 'Frankfurt, Germany'
    },
    {
        id: 'lol-kr',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'Korea',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg',
        displayEndpoint: 'Seoul, Korea'
    },
    {
        id: 'lol-jp',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'Japan',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg',
        displayEndpoint: 'Tokyo, Japan'
    },
    {
        id: 'lol-oce',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'Oceania',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg',
        displayEndpoint: 'Sydney, Australia'
    },
    {
        id: 'lol-br',
        name: 'League of Legends',
        publisher: 'Riot Games',
        region: 'Brazil',
        logo: `${SIMPLE_ICONS_CDN}/leagueoflegends`,
        color: '#c28f2c',
        testEndpoint: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg',
        displayEndpoint: 'São Paulo, Brazil'
    },

    // ==================== COUNTER-STRIKE 2 ====================
    {
        id: 'cs2-useast',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'US East',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Virginia, USA'
    },
    {
        id: 'cs2-uswest',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'US West',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Los Angeles, USA'
    },
    {
        id: 'cs2-europe',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'EU West',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Luxembourg'
    },
    {
        id: 'cs2-stockholm',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'EU North',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Stockholm, Sweden'
    },
    {
        id: 'cs2-singapore',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'Singapore',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Singapore'
    },
    {
        id: 'cs2-india',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'India',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Mumbai, India'
    },
    {
        id: 'cs2-japan',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'Japan',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Tokyo, Japan'
    },
    {
        id: 'cs2-brazil',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'Brazil',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'São Paulo, Brazil'
    },
    {
        id: 'cs2-australia',
        name: 'Counter-Strike 2',
        publisher: 'Valve',
        region: 'Australia',
        logo: `${SIMPLE_ICONS_CDN}/counterstrike`,
        color: '#f7a800',
        testEndpoint: 'https://www.counter-strike.net/favicon.ico',
        displayEndpoint: 'Sydney, Australia'
    },

    // ==================== FORTNITE ====================
    {
        id: 'fortnite-nae',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'NA East',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Virginia, USA'
    },
    {
        id: 'fortnite-naw',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'NA West',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Oregon, USA'
    },
    {
        id: 'fortnite-nac',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'NA Central',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Texas, USA'
    },
    {
        id: 'fortnite-eu',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'Europe',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Frankfurt, Germany'
    },
    {
        id: 'fortnite-asia',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'Asia',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Tokyo, Japan'
    },
    {
        id: 'fortnite-oce',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'Oceania',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Sydney, Australia'
    },
    {
        id: 'fortnite-brazil',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'Brazil',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'São Paulo, Brazil'
    },
    {
        id: 'fortnite-me',
        name: 'Fortnite',
        publisher: 'Epic Games',
        region: 'Middle East',
        logo: `${SIMPLE_ICONS_CDN}/fortnite`,
        color: '#9d4dbb',
        testEndpoint: 'https://www.epicgames.com/favicon.ico',
        displayEndpoint: 'Bahrain'
    },

    // ==================== APEX LEGENDS ====================
    {
        id: 'apex-useast',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'US East',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'Virginia, USA'
    },
    {
        id: 'apex-uswest',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'US West',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'Oregon, USA'
    },
    {
        id: 'apex-europe',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'Europe',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'Frankfurt, Germany'
    },
    {
        id: 'apex-london',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'London',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'London, UK'
    },
    {
        id: 'apex-singapore',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'Singapore',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'Singapore'
    },
    {
        id: 'apex-tokyo',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'Tokyo',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'Tokyo, Japan'
    },
    {
        id: 'apex-sydney',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'Sydney',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'Sydney, Australia'
    },
    {
        id: 'apex-brazil',
        name: 'Apex Legends',
        publisher: 'Electronic Arts',
        region: 'Brazil',
        logo: `${SIMPLE_ICONS_CDN}/apexlegends`,
        color: '#ed1c24',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'São Paulo, Brazil'
    },

    // ==================== DOTA 2 ====================
    {
        id: 'dota2-useast',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'US East',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Virginia, USA'
    },
    {
        id: 'dota2-uswest',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'US West',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Washington, USA'
    },
    {
        id: 'dota2-europe',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'EU West',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Luxembourg'
    },
    {
        id: 'dota2-russia',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'Russia',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Stockholm, Sweden'
    },
    {
        id: 'dota2-sea',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'Southeast Asia',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Singapore'
    },
    {
        id: 'dota2-india',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'India',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Mumbai, India'
    },
    {
        id: 'dota2-japan',
        name: 'Dota 2',
        publisher: 'Valve',
        region: 'Japan',
        logo: `${SIMPLE_ICONS_CDN}/dota2`,
        color: '#be1e37',
        testEndpoint: 'https://www.dota2.com/favicon.ico',
        displayEndpoint: 'Tokyo, Japan'
    },

    // ==================== OVERWATCH 2 ====================
    {
        id: 'ow2-americas',
        name: 'Overwatch 2',
        publisher: 'Blizzard',
        region: 'Americas',
        logo: `${SIMPLE_ICONS_CDN}/overwatch`,
        color: '#f99e1a',
        testEndpoint: 'https://overwatch.blizzard.com/favicon.ico',
        displayEndpoint: 'US West'
    },
    {
        id: 'ow2-europe',
        name: 'Overwatch 2',
        publisher: 'Blizzard',
        region: 'Europe',
        logo: `${SIMPLE_ICONS_CDN}/overwatch`,
        color: '#f99e1a',
        testEndpoint: 'https://overwatch.blizzard.com/favicon.ico',
        displayEndpoint: 'Paris, France'
    },
    {
        id: 'ow2-asia',
        name: 'Overwatch 2',
        publisher: 'Blizzard',
        region: 'Asia',
        logo: `${SIMPLE_ICONS_CDN}/overwatch`,
        color: '#f99e1a',
        testEndpoint: 'https://overwatch.blizzard.com/favicon.ico',
        displayEndpoint: 'Seoul, Korea'
    },

    // ==================== STEAM PLATFORM ====================
    {
        id: 'steam-global',
        name: 'Steam',
        publisher: 'Valve',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/steam`,
        color: '#1b2838',
        testEndpoint: 'https://store.steampowered.com/favicon.ico',
        displayEndpoint: 'store.steampowered.com'
    },

    // ==================== PLATFORMS & SERVICES ====================
    {
        id: 'battlenet-us',
        name: 'Battle.net',
        publisher: 'Blizzard',
        region: 'Americas',
        logo: `${SIMPLE_ICONS_CDN}/battledotnet`,
        color: '#00aeff',
        testEndpoint: 'https://us.battle.net/favicon.ico',
        displayEndpoint: 'us.battle.net'
    },
    {
        id: 'battlenet-eu',
        name: 'Battle.net',
        publisher: 'Blizzard',
        region: 'Europe',
        logo: `${SIMPLE_ICONS_CDN}/battledotnet`,
        color: '#00aeff',
        testEndpoint: 'https://eu.battle.net/favicon.ico',
        displayEndpoint: 'eu.battle.net'
    },
    {
        id: 'epic-store',
        name: 'Epic Games Store',
        publisher: 'Epic Games',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/epicgames`,
        color: '#313131',
        testEndpoint: 'https://store.epicgames.com/favicon.ico',
        displayEndpoint: 'store.epicgames.com'
    },
    {
        id: 'ubisoft-connect',
        name: 'Ubisoft Connect',
        publisher: 'Ubisoft',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/ubisoft`,
        color: '#0070ff',
        testEndpoint: 'https://www.ubisoft.com/favicon.ico',
        displayEndpoint: 'connect.ubisoft.com'
    },
    {
        id: 'ea-app',
        name: 'EA App',
        publisher: 'Electronic Arts',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/ea`,
        color: '#ff4747',
        testEndpoint: 'https://www.ea.com/favicon.ico',
        displayEndpoint: 'ea.com'
    },

    // ==================== OTHER POPULAR GAMES ====================
    {
        id: 'minecraft-global',
        name: 'Minecraft',
        publisher: 'Mojang',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/minecraft`,
        color: '#62b47a',
        testEndpoint: 'https://www.minecraft.net/favicon.ico',
        displayEndpoint: 'minecraft.net'
    },
    {
        id: 'roblox-global',
        name: 'Roblox',
        publisher: 'Roblox Corp',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/roblox`,
        color: '#ff0000',
        testEndpoint: 'https://www.roblox.com/favicon.ico',
        displayEndpoint: 'roblox.com'
    },
    {
        id: 'genshin-asia',
        name: 'Genshin Impact',
        publisher: 'miHoYo',
        region: 'Asia',
        logo: `${SIMPLE_ICONS_CDN}/hoyoverse`,
        color: '#6fc3df',
        testEndpoint: 'https://genshin.hoyoverse.com/favicon.ico',
        displayEndpoint: 'Asia Server'
    },
    {
        id: 'genshin-america',
        name: 'Genshin Impact',
        publisher: 'miHoYo',
        region: 'America',
        logo: `${SIMPLE_ICONS_CDN}/hoyoverse`,
        color: '#6fc3df',
        testEndpoint: 'https://genshin.hoyoverse.com/favicon.ico',
        displayEndpoint: 'America Server'
    },
    {
        id: 'genshin-europe',
        name: 'Genshin Impact',
        publisher: 'miHoYo',
        region: 'Europe',
        logo: `${SIMPLE_ICONS_CDN}/hoyoverse`,
        color: '#6fc3df',
        testEndpoint: 'https://genshin.hoyoverse.com/favicon.ico',
        displayEndpoint: 'Europe Server'
    },

    // ==================== COMMUNICATION ====================
    {
        id: 'discord-global',
        name: 'Discord',
        publisher: 'Discord Inc',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/discord`,
        color: '#5865f2',
        testEndpoint: 'https://discord.com/assets/favicon.ico',
        displayEndpoint: 'discord.com'
    },
    {
        id: 'xbox-live',
        name: 'Xbox Live',
        publisher: 'Microsoft',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/xbox`,
        color: '#107c10',
        testEndpoint: 'https://www.xbox.com/favicon.ico',
        displayEndpoint: 'xbox.com'
    },
    {
        id: 'playstation',
        name: 'PlayStation Network',
        publisher: 'Sony',
        region: 'Global',
        logo: `${SIMPLE_ICONS_CDN}/playstation`,
        color: '#003791',
        testEndpoint: 'https://www.playstation.com/favicon.ico',
        displayEndpoint: 'playstation.com'
    }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_SERVERS };
}
