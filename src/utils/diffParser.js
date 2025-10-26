export function parsePatch(patchText) {
  if (!patchText) return [];
  const files = [];
  const fileBlocks = patchText.split(/\n(?=diff --git )/);
  for (const block of fileBlocks) {
    const fileMatch = block.match(/^\s*diff --git a\/(.+?) b\/(.+?)\n/);
    const filename = fileMatch ? fileMatch[2] : (block.split('\n')[0] || 'unknown');
    const hunks = [];
    const hunkRegex = /@@ -(\d+),?(\d+)? \+(\d+),?(\d+)? @@/g;
    let match;
    while ((match = hunkRegex.exec(block)) !== null) {
      const oldStart = parseInt(match[1], 10);
      const oldLines = match[2] ? parseInt(match[2], 10) : 1;
      const newStart = parseInt(match[3], 10);
      const newLines = match[4] ? parseInt(match[4], 10) : 1;
      const hunkStart = match.index + match[0].length;
      const nextMatch = hunkRegex.exec(block);
      const hunkEnd = nextMatch ? nextMatch.index : block.length;
      if (nextMatch) hunkRegex.lastIndex = nextMatch.index;
      const rawLines = block.slice(hunkStart, hunkEnd).split('\n').filter(Boolean);
      hunks.push({ oldStart, oldLines, newStart, newLines, lines: rawLines });
    }
    files.push({ filename, hunks });
  }
  return files;
}
