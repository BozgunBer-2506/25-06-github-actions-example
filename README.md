# GitHub Actions CI/CD - SSH & SSM Deployment

A practice project for automating deployments to an AWS EC2 instance using GitHub Actions. Two deployment methods are covered: SSH-based and SSM-based.

---

## Workflows

### 1. Hello World (`mein-erster-workflow.yml`)
A minimal workflow triggered manually via `workflow_dispatch`. Runs on `ubuntu-latest` and prints a timestamp. Used to verify that GitHub Actions is configured correctly.

### 2. SSH Deployment (deactivated)
Deployed a static HTML page to EC2 over SSH.

- GitHub Actions runner connects to EC2 via SSH using a private key stored as a GitHub Secret
- Copies files using `scp` or inline commands
- Requires port 22 open in the EC2 security group and the runner's IP whitelisted (or open to `0.0.0.0/0`)
- Sensitive: private key must be stored in `Settings > Secrets`

### 3. SSM Deployment (`website-deploy-ssm.yml`)
Deploys to EC2 using AWS Systems Manager (SSM) - no SSH or open ports required.

- GitHub Actions authenticates to AWS using `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (stored as secrets)
- Uses `aws-actions/configure-aws-credentials@v4` to set up the AWS CLI session
- Sends a shell script to the EC2 instance via `aws ssm send-command` with the `AWS-RunShellScript` document
- EC2 must have the `AmazonSSMManagedInstanceCore` IAM policy attached and the SSM Agent running
- No inbound ports need to be open - communication goes through the AWS API

**Commands executed on EC2:**
```bash
sudo apt update -y && sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
echo "Deployment Successful via AWS SSM" | sudo tee /var/www/html/index.html
```

> `apt install -y nginx` is idempotent - safe to run on every deployment regardless of whether nginx is already installed.

---

## Secrets Required

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `INSTANCE_ID` | EC2 instance ID (e.g. `i-0abc123...`) |

---

## SSH vs SSM

| | SSH | SSM |
|---|---|---|
| Port required | 22 (inbound) | None |
| Key management | Private key as secret | IAM role/user |
| EC2 requirement | SSH daemon running | SSM Agent + IAM policy |
| Security | Moderate | Higher (no exposed ports) |
| Best for | Simple setups | Production / best practice |
