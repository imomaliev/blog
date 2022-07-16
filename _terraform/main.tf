module "github" {
  # https://github.com/imomaliev/terraform-registry/tree/main/modules/github
  source = "git@github.com:imomaliev/terraform-registry.git//modules/github"

  token               = var.github_token
  project_name        = "Blog"
  project_description = "Personal blog"
  project_url         = "https://imomaliev.github.io/blog"
  topics              = ["blog", "hugo", "go", "terraform", "pre-commit", "editorconfig"]
}
