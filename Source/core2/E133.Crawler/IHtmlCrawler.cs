using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace E133.Crawler
{
    public interface IHtmlCrawler
    {
        Task<IEnumerable<Uri>> GetAllSiteLinks(Uri uri);
    }
}