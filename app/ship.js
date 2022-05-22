document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    app
      .initialized()
      .then(function (client) {
        client.events.on("app.activated", function () {
          onAppActivate(client);
        });
      })
      .catch(handleErr);
  }
};

async function onAppActivate(client) {
  const $entity = prepareEntity(client);
  console.log(await schema($entity));
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}

// ----------------------------
// Custom Objects interactions
// ----------------------------

function prepareEntity(client) {
  const entity = client.db.entity({ version: "v1" });
  return entity.get("ships");
}

function schema($entity) {
  return $entity.schema();
}

function create($entity, payload) {
  return $entity.create(payload);
}