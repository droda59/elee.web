namespace E133.Parser
{
    public interface IParserFactory
    {
        IHtmlParser CreateParser(string url);
    }
}