using Microsoft.AspNet.Authorization;

namespace CookItNow.Api.Infrastructure
{
    public class LocalAuthorizationOnlyRequirement : AuthorizationHandler<LocalAuthorizationOnlyRequirement>, IAuthorizationRequirement
    {
        protected override void Handle(AuthorizationContext context, LocalAuthorizationOnlyRequirement requirement)
        {
            // if (context.HttpContext.Request.RequestUri.Host == "localhost")
            {
                context.Succeed(requirement);
            }
            // else
            // {
            //     context.Fail();
            // }
        }
        // protected override bool IsAuthorized(HttpActionContext actionContext)
        // {
        //     return actionContext.Request.RequestUri.Host == "localhost";
        // }
    }
}