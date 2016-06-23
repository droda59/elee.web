using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using E133.Business.Bases;

namespace E133.Crawler
{
    public interface IHtmlCrawler<TBase>
        where TBase : IBase, new()
    {
        Task<IEnumerable<Uri>> GetAllSiteLinks();
    }
}