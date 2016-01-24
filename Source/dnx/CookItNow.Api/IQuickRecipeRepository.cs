using System.Collections.Generic;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;

namespace CookItNow.Api
{
    public interface IQuickRecipeRepository
    {
        Task<QuickRecipe> GetAsync(string id);

        Task<bool> UpdateAsync(QuickRecipe data);

        Task<bool> InsertAsync(QuickRecipe data);

        Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query);
    }
}