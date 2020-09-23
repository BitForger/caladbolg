resource "aws_ecs_task_definition" "main" {
  execution_role_arn = data.aws_iam_role.execution-role.arn
  container_definitions = <<EOF
  [
    {
      "name": "caladbolg",
      "executionRoleArn": "arn:aws:iam::508511800738:role/ecsTaskExecutionRole",
      "image": "508511800738.dkr.ecr.us-east-1.amazonaws.com/caladbolg:${var.tag}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "valueFrom": "arn:aws:ssm:us-east-1:508511800738:parameter/caladbolg/discord-token",
          "name": "DISCORD_TOKEN"
        },
        {
          "valueFrom": "arn:aws:ssm:us-east-1:508511800738:parameter/caladbolg/mongo_uri",
          "name": "MONGO_URI"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/caladbolg",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "web"
        }
      }
    }
  ]
  EOF

  family = "caladbolg"
  memory = "128"
  cpu = "128"
  depends_on = [data.aws_iam_role.execution-role]
}

data "aws_iam_role" "execution-role" {
  name = "ecsTaskExecutionRole"
}
