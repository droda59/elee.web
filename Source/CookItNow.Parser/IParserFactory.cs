using System;

namespace CookItNow.Parser
{
    public interface IParserFactory
    {
        IHtmlParser CreateParser(string url);
    }
}