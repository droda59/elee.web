using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;

namespace CookItNow.Api
{
    public interface IQuickRecipeRepository
    {
        QuickRecipe Get(long id);

        Task<bool> Update(string url);

        IEnumerable<QuickRecipeSearchResult> Search(string query);
    }
}