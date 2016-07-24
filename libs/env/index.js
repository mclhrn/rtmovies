// Variables that should be set, and some default dev values.
var required_vars = {

  /**
   * Base URL
   */
  "RT_BASE_URL": "http://api.rottentomatoes.com/api/public/v1.0/",

  /**
   * API KEY
   */
  "API_KEY_1": "f7bmstqngj3k598bxrbegg5a",
  "API_KEY_2": "rnskf2r9uenzrwszs2gnr44j",


  /**
   *
   * MOVIE URLS
   *
   */

  /**
   *SEARCH_MOVIES
   Parameter	    Required	    Default	    Description
   ---------      --------      -------     -----------
   q	            false		                  The plain text search query to search for a movie. Remember to URI encode this!
   page_limit	    false	        30	        The amount of movie search results to show per page
   page	          false	        1	          The selected page of movie search results
   */
  "RT_SEARCH_MOVIES_URL": "movies.json?apikey=",
  "RT_SEARCH_MOVIES_PARAMS": "&page_limit=10&q=", //add query at run time // Remember to URI encode this!


  /**
   *  IN_THEATRES
   Parameter	    Required	    Default	    Description
   ---------      --------      -------     -----------
   page_limit	    false		      16          The amount of movies in theaters to show per page
   page	          false	        1	          The selected page of in theaters movies
   country	      false	        us	        Provides localized data for the selected country (ISO 3166-1 alpha-2) if available. Otherwise, returns US data.
                                            https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
                                            Use this to get CODE for country on device and serve movies for that locale
   */
  "RT_IN_THEATRES_URL": "lists/movies/in_theaters.json?apikey=",
  "RT_IN_THEATRES_PARAMS": "&page_limit=12&country=GB", //add country at run time


  /**
   *
   Parameter	    Required	    Default	    Description
   ---------      --------      -------     -----------
   page_limit	    false	        16	        The amount of upcoming movies to show per page
   page	          false	        1	          The selected page of upcoming movies
   country	      false	        us	        Provides localized data for the selected country (ISO 3166-1 alpha-2) if available. Otherwise, returns US data.
                                            https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
                                            Use this to get CODE for country on device and serve movies for that locale
   */
  "RT_UPCOMING_URL": "lists/movies/upcoming.json?apikey=",
  "RT_UPCOMING_PARAMS": "&page_limit=12&country=GB" //add country at run time
};

function get(key) {
  return required_vars[key];
}

module.exports = {
  get: get
};
