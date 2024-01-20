import React,{useState,useEffect} from 'react'

const Contact = () => {
  const [cityName, setCityName] = useState('');
  const [date, setDate] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Default search for India on the current date
    const currentDate = new Date().toISOString().split('T')[0];
    fetchNews('India', currentDate);
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  const fetchNews = (city, selectedDate) => {
    const apiKey = 'e6cbd4e6f6874a1fa4dcb5dcb07aa8ae';
    const apiUrl = `https://newsapi.org/v2/everything?q=${city}&from=${selectedDate}&to=${selectedDate}&sortBy=popularity&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles);
      })
      .catch(error => console.error('Error fetching news:', error));
  };

  const handleSearch = () => {
    fetchNews(cityName, date);
  };

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <input
          className="form-control me-sm-2"
          type="search"
          placeholder="Search"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <input
          className="form-control me-sm-2"
          type="date"
          placeholder="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={handleSearch}>
          Search
        </button>
      </nav>

      <h1 className="mt-4">World News</h1>

      <div className="row">
        {articles.map((article, index) => (
          <div className="col-4 d-flex justify-content-center" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
              </div>
              <img src={article.urlToImage} className="card-img-top" alt="Image" />
              <div className="card-body">
                <p className="card-text">{article.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{article.source.name}</li>
                <li className="list-group-item">{article.publishedAt}</li>
              </ul>
              <div className="card-body">
                <a href={article.url} className="card-link" target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contact
