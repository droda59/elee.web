namespace CookItNow.Parser.Utils
{
    internal interface IActionDetector
    {
        bool IsAction(string part);

        string Actionify(string phrase);
    }
}