import { articoli } from "../data/articoli.js";
import connection from "../data/db.js";

//INDEX
export const index = (req, res) => {
  let sql = `SELECT DISTINCT a.* FROM posts a`;

  if (req.query.tag) {
    sql += ` JOIN post_tag b ON a.id = b.post_id 
            JOIN tags c ON b.tag_id = c.id
            WHERE c.label IN (?)`;
  }

  connection.query(sql, [req.query.tag], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

//SHOW
export const show = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = "SELECT * FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json(results[0]);
  });
};

//STORE
export const store = (req, res) => {
  const newId = articoli[articoli.length - 1].id + 1;
  const newArticolo = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    img: req.body.img,
    tags: req.body.tags,
  };

  articoli.push(newArticolo);

  console.log({ "Articolo inserito:": articoli[articoli.length - 1] });

  res.status(201);
  res.json(newArticolo);
};

//UPDATE
export const update = (req, res) => {
  const id = parseInt(req.params.id);
  const articolo = articoli.find(articolo => articolo.id === id);

  if (!articolo) {
    res.status(404);
    return res.json({
      error: "Not found",
      message: "Pizza non trovata",
    });
  }

  articolo.title = req.body.title;
  articolo.content = req.body.content;
  articolo.img = req.body.img;
  articolo.tags = req.body.tags;

  console.log(articoli);
  res.json(articoli);
};

//MODIFY
export const modify = (req, res) => {
  const id = parseInt(req.params.id);
  const articolo = articoli.find(articolo => articolo.id === id);

  if (!articolo) {
    res.status(404);
    return res.json({
      error: "Not found",
      message: "Pizza non trovata",
    });
  }

  /*QUI L'OPERATORE TERNARIO CONTROLLA SOLO SE req.body.title É TRUTHY, 
    NON VA BENE SE FALSY COME STRINGA VUOTA
  req.body.title ? (articolo.title = req.body.title) : articolo.title;
  req.body.content ? (articolo.content = req.body.content) : articolo.content;
  req.body.img ? (articolo.img = req.body.img) : articolo.img;
  req.body.tags ? (articolo.tags = req.body.tags) : articolo.tags; */

  articolo.title = req.body.title ?? articolo.title;
  articolo.content = req.body.content ?? articolo.content;
  articolo.img = req.body.img ?? articolo.img;
  articolo.tags = req.body.tags ?? articolo.tags;

  console.log(articoli);
  res.json(articoli);
};

//DESTROY
export const destroy = (req, res) => {
  const id = parseInt(req.params.id);

  connection.query("DELETE FROM posts WHERE id = ?", [id], err => {
    if (err) return res.status(500).json({ error: "Failed to delete post" });
    res.sendStatus(204);
  });
};
