using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;
using CookItNow.Parser;

using MongoDB.Bson;
using MongoDB.Driver;

namespace CookItNow.Api
{
    internal class QuickRecipeRepository : IQuickRecipeRepository
    {
        private readonly IParserFactory _parserFactory;

        public QuickRecipeRepository(IParserFactory parserFactory)
        {
            this._parserFactory = parserFactory;
        }

        public async Task<QuickRecipe> GetAsync(string id)
        {
            var client = new MongoClient("mongodb://localhost"); 
            var database = client.GetDatabase("cookitnow"); 
            var collection = database.GetCollection<QuickRecipe>("quickrecipe");

            var documentsTask = await collection.Find(x => x.Id == id).FirstAsync();

            return documentsTask;
        }

        public async Task<bool> UpdateAsync(string url)
        {
            var uri = new Uri(url);
            IHtmlParser parser;

            try
            {
                parser = this._parserFactory.CreateParser(url);
            }
            catch (KeyNotFoundException)
            {
                return false;
            }

            var parsedContent = await parser.ParseHtmlAsync(uri);
            parsedContent.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();

            var document = parsedContent.ToBsonDocument();

            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("cookitnow");
            var collection = database.GetCollection<BsonDocument>("quickrecipe");

            await collection.InsertOneAsync(document);

            return true;
        }

        public async Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
        {
            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("cookitnow");
            var collection = database.GetCollection<QuickRecipe>("quickrecipe");

            var results = await collection.Find(new BsonDocument()).ToListAsync();

            return results
                .Select(x => new QuickRecipeSearchResult { Id = x.Id, Title = x.Title, OriginalUrl = x.OriginalUrl })
                .ToList();
        }
    }
}