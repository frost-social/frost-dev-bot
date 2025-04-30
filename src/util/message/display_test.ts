import { assertEquals } from "@std/assert/equals";
import { displayUserNameOf } from "./display.ts";

// displayUserNameOf()

Deno.test('displayUserNameOf(): Returns "[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)" when name is present with default options', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user);

  assertEquals(
    ret,
    "[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)",
  );
});

Deno.test('displayUserNameOf(): Returns "[<plain>@userID</plain>](https://example.com/)" when name is null with default options', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: null,
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user);

  assertEquals(ret, "[<plain>@userID</plain>](https://example.com/)");
});

Deno.test('displayUserNameOf(): Returns "[<plain>@userID</plain>](https://example.com/)" when name is undefined with default options', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user);

  assertEquals(ret, "[<plain>@userID</plain>](https://example.com/)");
});

Deno.test('displayUserNameOf(): Returns "<plain>@userID</plain>" when name is present with { withName: false, link: null }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: false,
    link: null,
  });

  assertEquals(ret, "<plain>@userID</plain>");
});

Deno.test('displayUserNameOf(): Returns "[<plain>@userID</plain>](https://example.com/)" when name is present with { withName: false, link: {} }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: false,
    link: {},
  });

  assertEquals(ret, "[<plain>@userID</plain>](https://example.com/)");
});

Deno.test('displayUserNameOf(): Returns "[<plain>@userID</plain>](https://example.com/)" when name is present with { withName: false, link: { withPreview: true } }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: false,
    link: {
      withPreview: true,
    },
  });

  assertEquals(ret, "[<plain>@userID</plain>](https://example.com/)");
});

Deno.test('displayUserNameOf(): Returns "?[<plain>@userID</plain>](https://example.com/)" when name is present with { withName: false, link: { withPreview: false } }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: false,
    link: {
      withPreview: false,
    },
  });

  assertEquals(ret, "?[<plain>@userID</plain>](https://example.com/)");
});

Deno.test('displayUserNameOf(): Returns "<plain>userName</plain> (<plain>@userID</plain>)" when name is present with { withName: true, link: null }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: true,
    link: null,
  });

  assertEquals(ret, "<plain>userName</plain> (<plain>@userID</plain>)");
});

Deno.test('displayUserNameOf(): Returns "[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)" when name is present with { withName: true, link: {} }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: true,
    link: {},
  });

  assertEquals(
    ret,
    "[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)",
  );
});

Deno.test('displayUserNameOf(): Returns "[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)" when name is present with { withName: true, link: { withPreview: true } }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: true,
    link: {
      withPreview: true,
    },
  });

  assertEquals(
    ret,
    "[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)",
  );
});

Deno.test('displayUserNameOf(): Returns "?[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)" when name is present with { withName: true, link: { withPreview: false } }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    name: "userName",
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: true,
    link: {
      withPreview: false,
    },
  });

  assertEquals(
    ret,
    "?[<plain>userName</plain> (<plain>@userID</plain>)](https://example.com/)",
  );
});

Deno.test('displayUserNameOf(): Returns "<plain>@userID</plain>" when name is absent with { withName: true, link: null }', () => {
  const user: Parameters<typeof displayUserNameOf>[0] = {
    login: "userID",
    html_url: "https://example.com/",
  };

  const ret = displayUserNameOf(user, {
    withName: true,
    link: null,
  });

  assertEquals(ret, "<plain>@userID</plain>");
});
