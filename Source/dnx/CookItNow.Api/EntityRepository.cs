using MongoDB.Driver;

namespace CookItNow.Api
{
    public abstract class EntityRepository<TDocument>
    {
        private readonly IMongoCollection<TDocument> _collection;

        protected EntityRepository()
        {
            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("cookitnow");

            this._collection = database.GetCollection<TDocument>(typeof(TDocument).Name.ToLower());
        }

        protected IMongoCollection<TDocument> Collection
        {
            get { return this._collection; }
        }
    }
}