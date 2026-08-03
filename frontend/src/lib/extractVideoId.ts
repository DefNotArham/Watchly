const extractVideoId = (input: string) => {
  try {
    const url = new URL(input);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1);
    }

    if (url.pathname.includes("/shorts/")) {
      return url.pathname.split("/shorts/")[1];
    }

    if (url.pathname.includes("/embed/")) {
      return url.pathname.split("/embed/")[1];
    }

    return url.searchParams.get("v");
  } catch {
    return input;
  }
};

export default extractVideoId;
