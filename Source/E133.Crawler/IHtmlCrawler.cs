using System;
using System.Collections.Generic;

namespace E133.Crawler
{
    public interface IHtmlCrawler
    {
        IEnumerable<Uri> GetLinks();
    }
}