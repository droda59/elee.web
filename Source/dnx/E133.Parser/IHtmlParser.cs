using System;
using System.Threading.Tasks;

using E133.Business.Models;

namespace E133.Parser
{
    public interface IHtmlParser
    {
        string BaseDomain { get; }

        Task<QuickRecipe> ParseHtmlAsync(Uri uri);
    }
}