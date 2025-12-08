# WorkAdventure Local Development Setup Guide

This guide provides step-by-step instructions to set up and run a local instance of WorkAdventure.

## Table of Content:

   - [File Structure](#file-structure)
   - [Adding Complete Wokas](#adding-complete-wokas)
   - [Adding Layer-Based Wokas](#adding-layer-based-wokas)
   - [Updating woka.json](#updating-wokajson)
   - [Testing Your Wokas](#testing-your-wokas)
   - [Troubleshooting](#troubleshooting)

## Prerequisites

- **Docker** and **Docker Compose** installed
- **Git** installed
- At least 8GB of available RAM (recommended)
- Port 80 available on your machine

## Step 1: Clone the Repository

```bash
# Clone your fork (or the upstream repository)
git clone https://github.com/First-Contact-FC/wa.git
cd wa
```

## Step 2: Sync with Upstream (Optional but Recommended)

If you're working with a fork, ensure it's synchronized with the upstream repository:

```bash
# Add upstream remote
git remote add upstream https://github.com/workadventure/workadventure.git

# Fetch latest from upstream
git fetch upstream

# Reset your master branch to match upstream exactly
git checkout master
git reset --hard upstream/master

# Force push to your fork (if you want to sync the remote)
git push origin master --force
```

**Note:** Force pushing will overwrite your remote branch. Only do this if you want your fork to exactly match upstream.

## Step 3: Configure Environment

```bash
# Copy the environment template
cp .env.template .env

# The .env file is already configured with default values
# You can edit it if needed, but defaults work for local development
```

## Step 4: Start the Services

```bash
# Start all services in detached mode
docker-compose up -d

# Or start in foreground to see logs
docker-compose up
```

## Step 5: Wait for Services to Initialize

The services need time to:
- Install npm dependencies
- Generate protocol buffer files
- Start all microservices

**Wait approximately 2-3 minutes** for everything to be ready.

### Verify Initialization Steps

You can check the progress of each step:

```bash
# Check if npm dependencies are installed (look for "up to date" or "audited" in logs)
docker-compose logs play | grep -E "(audited|up to date|npm install)"

# Check if protocol buffer files are generated
ls -la libs/messages/src/ts-proto-generated/*.ts

# Check if all microservices are running
docker-compose ps
```

### Monitor Startup Progress

```bash
# View logs from all services
docker-compose logs -f

# View logs from a specific service
docker-compose logs -f play
docker-compose logs -f messages
docker-compose logs -f back
```

### Check Service Status

```bash
# Check which containers are running
docker-compose ps

# You should see all services in "Up" status
```

## Step 6: Verify Services Are Running

```bash
# Test if the main application is accessible
curl http://localhost/

# Should return HTTP 200
```

## Step 7: Configure Hosts File (If Needed)

On some operating systems, you may need to add entries to `/etc/hosts`:

```bash
# Edit hosts file (requires sudo/admin access)
sudo nano /etc/hosts  # Linux/Mac
# or
notepad C:\Windows\System32\drivers\etc\hosts  # Windows
```

Add this line:

```
127.0.0.1 oidc.workadventure.localhost redis.workadventure.localhost play.workadventure.localhost traefik.workadventure.localhost matrix.workadventure.localhost extra.workadventure.localhost icon.workadventure.localhost map-storage.workadventure.localhost uploader.workadventure.localhost maps.workadventure.localhost api.workadventure.localhost front.workadventure.localhost
```

## Step 8: Access the Application

### Main Application URLs

- **Main Application:** http://play.workadventure.localhost/ or http://localhost/
- **Frontend:** http://front.workadventure.localhost/

### Admin & Monitoring URLs

- **Traefik Dashboard:** http://traefik.workadventure.localhost
- **Redis Insight:** http://redis.workadventure.localhost

### Other Service URLs

- **API:** http://api.workadventure.localhost
- **Map Storage:** http://map-storage.workadventure.localhost
- **Uploader:** http://uploader.workadventure.localhost
- **Maps:** http://maps.workadventure.localhost

## Step 9: Login Credentials

The default setup includes an OIDC mock server with test users:

- **Username:** `User1`
- **Password:** `pwd`

Additional test users:
- `User2` / `pwd`
- `UserMatrix` / `pwd`

## Troubleshooting

### Issue: 502 Bad Gateway

**Symptoms:** Getting 502 errors when accessing the application.

**Solutions:**

1. **Wait longer** - Services may still be initializing (can take 2-3 minutes)
   ```bash
   docker-compose logs -f play
   ```

2. **Check if proto files are generated:**
   ```bash
   ls -la libs/messages/src/ts-proto-generated/*.ts
   ```
   
   If files are missing, the messages container may need protoc installed:
   ```bash
   docker-compose exec messages sudo apt-get update
   docker-compose exec messages sudo apt-get install -y protobuf-compiler
   docker-compose restart messages play back map-storage
   ```

3. **Check service logs:**
   ```bash
   docker-compose logs play
   docker-compose logs messages
   docker-compose logs back
   ```

### Issue: Services Keep Restarting

**Check logs for errors:**
```bash
docker-compose logs --tail=50 [service-name]
```

**Common causes:**
- Missing dependencies
- Port conflicts
- Insufficient memory

### Issue: Protocol Buffer Generation Fails

If you see errors about `protoc` not found:

```bash
# Install protoc in the messages container
docker-compose exec messages sudo apt-get update
docker-compose exec messages sudo apt-get install -y protobuf-compiler

# Restart dependent services
docker-compose restart messages
sleep 10
docker-compose restart play back map-storage
```

### Issue: Port Already in Use

If port 80 is already in use:

1. Stop the conflicting service
2. Or modify `docker-compose.yaml` to use a different port

### Issue: Services Not Starting

**Clean restart:**
```bash
# Stop all services
docker-compose down

# Remove volumes (optional - this will delete data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Useful Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f play
docker-compose logs -f back
docker-compose logs -f messages
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart play
```

### Stop Services

```bash
# Stop services (keeps containers)
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (deletes data)
docker-compose down -v
```

### Check Service Status

```bash
# List all services and their status
docker-compose ps

# Detailed status
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

### Access Container Shell

```bash
# Access play container
docker-compose exec play bash

# Access back container
docker-compose exec back bash

# Access messages container
docker-compose exec messages bash
```

## Development Workflow

### Making Changes

1. Make your code changes
2. Services with hot-reload will automatically pick up changes
3. For services without hot-reload, restart the service:
   ```bash
   docker-compose restart [service-name]
   ```

### Running Without OIDC (Anonymous Access)

If you want to disable the OIDC mock server for anonymous access:

```bash
docker-compose -f docker-compose.yaml -f docker-compose-no-oidc.yaml up
```

## Service Architecture

WorkAdventure consists of multiple microservices:

- **play** - Main game server (ports 3000, 3001)
- **back** - Backend API server
- **map-storage** - Map storage service
- **messages** - Protocol buffer message generator
- **uploader** - File upload service
- **maps** - Static map files server
- **redis** - Redis cache
- **synapse** - Matrix chat server
- **oidc-server-mock** - OIDC authentication mock server
- **reverse-proxy** - Traefik reverse proxy (port 80)

## Debug Ports

Debug ports are exposed for Node.js services:

- **play:** 9231 (9229 inside container)
- **back:** 9232 (9229 inside container)
- **map-storage:** 9233 (9229 inside container)
- **uploader:** 9234 (9229 inside container)

## Next Steps

- Explore the application at http://play.workadventure.localhost/
- Check the [official documentation](https://docs.workadventu.re/)
- Review the [contributing guide](CONTRIBUTING.md)
- Join the [Discord community](https://discord.gg/G6Xh9ZM9aR)

## Additional Resources

- **Official Repository:** https://github.com/workadventure/workadventure
- **Documentation:** https://docs.workadventu.re/
- **Map Building Guide:** https://docs.workadventu.re/map-building/
- **Troubleshooting Guide:** https://docs.workadventu.re/self-hosting/troubleshooting/

---

**Last Updated:** Based on WorkAdventure commit `e630bced4`

