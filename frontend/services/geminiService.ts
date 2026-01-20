export const searchAnime = async (query: string, language: 'es' | 'en') => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`);
    if (!response.ok) {
        console.error("Failed to fetch from Jikan API, status:", response.status);
        return [];
    }
    const jsonData = await response.json();

    if (!jsonData.data || !Array.isArray(jsonData.data)) {
        console.error("Invalid data structure from Jikan API");
        return [];
    }
    
    const getTitle = (animeData: any): string => {
        if (!animeData.titles || !Array.isArray(animeData.titles)) {
            return animeData.title;
        }
        const langType = language === 'es' ? 'Spanish' : 'English';
        const localizedTitle = animeData.titles.find((t: any) => t.type === langType);
        if (localizedTitle) return localizedTitle.title;
        
        const englishTitle = animeData.titles.find((t: any) => t.type === 'English');
        if (englishTitle) return englishTitle.title;
        
        const defaultTitle = animeData.titles.find((t: any) => t.type === 'Default');
        return defaultTitle ? defaultTitle.title : animeData.title;
    };

    return jsonData.data.map((anime: any) => ({
      id: anime.mal_id,
      title: getTitle(anime),
      synopsis: anime.synopsis || (language === 'es' ? 'No hay sinopsis disponible.' : 'No synopsis available.'),
      coverUrl: anime.images?.jpg?.image_url || 'https://via.placeholder.com/150x210',
      totalEpisodes: anime.episodes || 0,
    }));

  } catch (error) {
    console.error("Error searching for anime with Jikan API:", error);
    return [];
  }
};

export const getNews = async (language: 'es' | 'en') => {
    try {
        const apiResponse = await fetch('https://api.jikan.moe/v4/seasons/upcoming?limit=5');
        if (!apiResponse.ok) {
            console.error("Failed to fetch news from Jikan API, status:", apiResponse.status);
            return [];
        }
        const jsonData = await apiResponse.json();
        
        if (!jsonData.data || !Array.isArray(jsonData.data)) {
            console.error("Invalid data structure from Jikan API");
            return [];
        }

        const getTitle = (animeData: any): string => {
             if (!animeData.titles || !Array.isArray(animeData.titles)) {
                return animeData.title;
            }
            const langType = language === 'es' ? 'Spanish' : 'English';
            const localizedTitle = animeData.titles.find((t: any) => t.type === langType);
            if (localizedTitle) return localizedTitle.title;
            
            const englishTitle = animeData.titles.find((t: any) => t.type === 'English');
            if (englishTitle) return englishTitle.title;
            
            const defaultTitle = animeData.titles.find((t: any) => t.type === 'Default');
            return defaultTitle ? defaultTitle.title : animeData.title;
        };

        return jsonData.data.map((anime: any) => ({
            headline: `${language === 'es' ? 'Próximamente' : 'Coming Soon'}: ${getTitle(anime)}`,
            summary: anime.synopsis || (language === 'es' ? 'Sin sinopsis disponible.' : 'No synopsis available.'),
            source: anime.studios[0]?.name || (language === 'es' ? 'Estudio Desconocido' : 'Unknown Studio'),
            url: anime.url,
        }));

    } catch (error) {
        console.error("Error fetching upcoming anime from Jikan API:", error);
        return [];
    }
};