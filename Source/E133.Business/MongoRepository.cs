// using System.Collections.Generic;
// using System.Threading.Tasks;

// using E133.Business.Models;
// using E133.Database;

// using MongoDB.Bson;
// using MongoDB.Driver;

// namespace E133.Business
// {
//     public class MongoRepository : EntityRepository<QuickRecipe>, IQuickRecipeRepository
//     {
//         public async Task<QuickRecipe> GetAsync(string id)
//         {
//             var documentsTask = await this.Collection.Find(x => x.Id == id).FirstAsync();

//             return documentsTask;
//         }

//         public async Task<bool> UpdateAsync(QuickRecipe data)
//         {
//             await this.Collection.FindOneAndReplaceAsync(x => x.Id == data.Id, data);

//             return true;
//         }

//         public async Task<bool> InsertAsync(QuickRecipe data)
//         {
//             await this.Collection.InsertOneAsync(data);
//             data.Id = ObjectId.GenerateNewId().ToString();

//             return true;
//         }

//         public async Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
//         {
//             await this.Collection.Indexes.CreateOneAsync(Builders<QuickRecipe>.IndexKeys.Text(x => x.Title));

//             var results = new List<QuickRecipeSearchResult>();
//             using (var cursor = await this.Collection.FindAsync(Builders<QuickRecipe>.Filter.Text(query)))
//             {
//                 while (await cursor.MoveNextAsync())
//                 {
//                     foreach (var document in cursor.Current)
//                     {
//                         results.Add(new QuickRecipeSearchResult { Id = document.Id, Title = document.Title, OriginalUrl = document.OriginalUrl });
//                     }
//                 }
//             }

//             return results;
//         }
//     }
// }