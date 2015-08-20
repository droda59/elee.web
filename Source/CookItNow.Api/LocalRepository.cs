using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;

namespace CookItNow.Api
{
    internal class LocalRepository : IQuickRecipeRepository
    {
        private readonly static IDictionary<string, QuickRecipe> _knownRecipes = new Dictionary<string, QuickRecipe>();

        public Task<QuickRecipe> GetAsync(string id)
        {
            var task = Task.Run(() => _knownRecipes[id]);
            task.Wait();

            return task;
        }

        public Task<bool> UpdateAsync(QuickRecipe data)
        {
            var task = Task.Run(
                () =>
                {
                    _knownRecipes[data.Id] = data;
                    return true;
                });
            task.Wait();

            return task;
        }

        public Task<bool> InsertAsync(QuickRecipe data)
        {
            var task = Task.Run(
                () =>
                {
                    _knownRecipes[data.Id] = data;
                    return true;
                });
            task.Wait();

            return task;
        }

        public Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
        {
            var task = Task.Run(() =>
                _knownRecipes.Values.Select(x => new QuickRecipeSearchResult { Id = x.Id, Title = x.Title, OriginalUrl = x.OriginalUrl }));
            task.Wait();

            return task;
        }
    }
}