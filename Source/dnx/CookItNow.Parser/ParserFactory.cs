using System;
using System.Collections.Generic;
using System.Linq;

namespace CookItNow.Parser
{
    internal class ParserFactory : IParserFactory
    {
        private readonly IDictionary<string, IHtmlParser> _parsers;

        public ParserFactory(IEnumerable<IHtmlParser> parsers)
        {
            this._parsers = parsers.ToDictionary(x => x.BaseDomain);
        }

        public IHtmlParser CreateParser(string url)
        {
            var uri = new Uri(url);

            var domain = uri.Authority;
            if (!this._parsers.ContainsKey(domain))
            {
                throw new KeyNotFoundException();
            }

            return this._parsers[domain];
        }
    }
}