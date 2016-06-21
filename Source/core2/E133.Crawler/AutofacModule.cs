using E133.Business.Bases;

using Autofac;

namespace E133.Crawler
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<RicardoCrawler>()
                .As<IHtmlCrawler<RicardoBase>>()
                .SingleInstance();
        }
    }
}