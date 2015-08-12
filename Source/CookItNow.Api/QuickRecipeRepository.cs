using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;

namespace CookItNow.Api
{
    // TODO Use MongoDB
    internal class QuickRecipeRepository : IQuickRecipeRepository
    {
        public QuickRecipe Get(long id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(string url)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<QuickRecipeSearchResult> Search(string query)
        {
            throw new NotImplementedException();
        }
    }
}