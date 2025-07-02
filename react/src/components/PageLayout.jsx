import LittleBox from "./LittleBox";

const PageLayout = (props) => {
    const { title, featured, sections } = props;
    return (
        <div>
            <h1>{title}</h1>
            <div>
                {featured?.map(feature => {
                    return (
                        <p key={feature.title}>{feature.title}: {feature?.value}</p>
                    );
                })}
            </div>
            {sections.map((section) => {
                return (
                    <div key={section?.title}>
                        <h2>{section?.title}</h2>
                        {section?.value?.map((val, idx) => <LittleBox key = {val?.id} title = {val?.title} page={section?.page} id={val?.id} />)}
                    </div>
                );
            })}
        </div>
    )
}

export default PageLayout;