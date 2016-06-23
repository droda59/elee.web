using System;
using System.Collections.Generic;
using System.Linq;

namespace E133.Parser
{
    internal class ParserFactory : IParserFactory
    {
        // private readonly IDictionary<string, IHtmlParser<TBase>> _parsers;

        // public ParserFactory(IEnumerable<IHtmlParser<TBase>> parsers)
        // {
        //     this._parsers = parsers.ToDictionary(x => x.BaseDomain.Authority);
        // }

        // public IHtmlParser<TBase> CreateParser<TBase>(string url)
        // {
        //     var uri = new Uri(url);

        //     return this.CreateParser(uri);
        // }

        // public IHtmlParser<TBase> CreateParser<TBase>(Uri uri)
        // {
        //     var domain = uri.Authority;
        //     if (!this._parsers.ContainsKey(domain))
        //     {
        //         throw new KeyNotFoundException();
        //     }

        //     return this._parsers[domain];
        // }
    }
}