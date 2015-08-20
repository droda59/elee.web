using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;

using MongoDB.Bson;
using MongoDB.Driver;

namespace CookItNow.Api
{
    internal class QuickRecipeRepository : IQuickRecipeRepository
    {
        public async Task<QuickRecipe> GetAsync(string id)
        {
            var collection = GetCollection<QuickRecipe>("quickrecipe");

            var documentsTask = await collection.Find(x => x.Id == id).FirstAsync();

            return documentsTask;
        }

        public async Task<bool> UpdateAsync(QuickRecipe data)
        {
            var collection = GetCollection<QuickRecipe>("quickrecipe");

            await collection.FindOneAndReplaceAsync(x => x.Id == data.Id, data);

            return true;
        }

        public async Task<bool> InsertAsync(QuickRecipe data)
        {
            var document = data.ToBsonDocument();

            var collection = GetCollection<BsonDocument>("quickrecipe");

            await collection.InsertOneAsync(document);

            return true;
        }

        public async Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
        {
            var collection = GetCollection<QuickRecipe>("quickrecipe");

            await collection.Indexes.CreateOneAsync(Builders<QuickRecipe>.IndexKeys.Text(x => x.Title));

            var results = new List<QuickRecipeSearchResult>();
            using (var cursor = await collection.FindAsync(Builders<QuickRecipe>.Filter.Text(query)))
            {
                while (await cursor.MoveNextAsync())
                {
                    foreach (var document in cursor.Current)
                    {
                        results.Add(new QuickRecipeSearchResult { Id = document.Id, Title = document.Title, OriginalUrl = document.OriginalUrl });
                    }
                }
            }

            return results;
        }

        private static IMongoCollection<TDocument> GetCollection<TDocument>(string collectionName)
        {
            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("cookitnow");
            var collection = database.GetCollection<TDocument>(collectionName);

            return collection;
        }
    }
}