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

        // TODO Async this
        public QuickRecipe Get(long id)
        {
            var client = new MongoClient("mongodb://localhost"); 
            var database = client.GetDatabase("cookitnow"); 
            var collection = database.GetCollection<QuickRecipe>("quickrecipe");

            var documentsTask = collection.Find(x => x.Id == id).FirstAsync();
            documentsTask.Wait();

            return documentsTask.Result;
        }

        public async Task<bool> Update(string url)
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

            var document = parsedContent.ToBsonDocument();

            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("cookitnow");

            // TODO Évidemment, do not drop the collection
            await database.DropCollectionAsync("quickrecipe");
            await database.CreateCollectionAsync("quickrecipe");

            var collection = database.GetCollection<BsonDocument>("quickrecipe");

            await collection.InsertOneAsync(document);

            return true;
        }

        public IEnumerable<QuickRecipeSearchResult> Search(string query)
        {
            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("cookitnow");
            var collection = database.GetCollection<QuickRecipe>("quickrecipe");

            var listAsync = collection.Find(new BsonDocument()).ToListAsync();
            listAsync.Wait();

            return listAsync
                .Result
                .Select(x => new QuickRecipeSearchResult { Id = x.Id, Title = x.Title, OriginalUrl = x.OriginalUrl })
                .ToList();
        }
    }
}