using System;
using System.Threading.Tasks;

using CookItNow.Business.Models;

namespace CookItNow.Parser
{
    public interface IHtmlParser
    {
        string BaseDomain { get; }

        Task<QuickRecipe> ParseHtmlAsync(Uri uri);
    }
}