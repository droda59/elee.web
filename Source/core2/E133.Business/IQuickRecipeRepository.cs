using System.Collections.Generic;
using System.Threading.Tasks;

using E133.Business.Models;

namespace E133.Business
{
    public interface IQuickRecipeRepository
    {
        Task<QuickRecipe> GetAsync(string id);

        Task<bool> UpdateAsync(QuickRecipe data);

        Task<bool> InsertAsync(QuickRecipe data);

        Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query);
    }
}