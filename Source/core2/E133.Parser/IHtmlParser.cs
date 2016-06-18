using System;
using System.Threading.Tasks;

using E133.Business.Models;

namespace E133.Parser
{
    public interface IHtmlParser
    {
        Uri BaseDomain { get; }
        
        bool IsRecipePage(Uri uri);

        Task<QuickRecipe> ParseHtmlAsync(Uri uri);
    }
}