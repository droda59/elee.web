using System;
using System.Threading.Tasks;

namespace CookItNow.Parser
{
    public interface IHtmlLoader
    {
        Task<string> ReadHtmlAsync(Uri uri);
    }
}
