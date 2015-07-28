namespace CookItNow.Parser.Utils
{
    public interface IActionDetector
    {
        bool IsAction(string part);

        string Actionify(string word);
    }
}