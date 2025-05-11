function getComponent(data) {
  switch (data["type"]) {
    case "group":
      return groupComponent(data["title_group"], data["content"]);
    case "paragraph":
      return richParagraph(data["content"]);
  }
}

function groupComponent(title, content) {
  const container = document.createElement("div");
  container.className = "content_group_container";

  if (title) {
    const titleGroup = document.createElement("h1");
    titleGroup.className = "title_group";
    titleGroup.textContent = title;
    container.appendChild(titleGroup);
  }

  if (content && Array.isArray(content)) {
    const contentContainer = document.createElement("div");
    contentContainer.className = "group_content_container";

    content.forEach((item) => {
      const paragraph = getComponent(item);
      contentContainer.appendChild(paragraph);
    });

    container.appendChild(contentContainer);
  }

  return container;
}

function richParagraph(content) {
  const paragraph = document.createElement("p");
  paragraph.className = "richParagraph";

  const text = richText(content);

  paragraph.innerHTML = text;

  return paragraph;
}

function richText(text) {
  let richText = text;

  if (text) {
    richText = richText.replace(
      /\*(.*?)\*/g,
      '<span class="span_text">$1</span>'
    );
    richText = richText.replace(
      /<####(.*?)>(.*?)<####>/g,
      '<a class="link_tag" href="$1" target="_blank">$2</a>'
    );
  }

  return richText;
}

export default getComponent;
