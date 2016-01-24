using System;
using System.Threading.Tasks;

namespace E133.Parser
{
    public interface IHtmlLoader
    {
        Task<string> ReadHtmlAsync(Uri uri);
    }
}
