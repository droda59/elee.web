namespace CookItNow.Parser.LanguageUtilities
{
    internal interface IActionDetector
    {
        bool IsAction(string part);

        string Actionify(string phrase);
    }
}